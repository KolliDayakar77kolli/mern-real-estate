import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, Button, Input, Text, VStack, IconButton, HStack, Spinner, Portal } from '@chakra-ui/react';
import { FaCommentDots } from 'react-icons/fa';
import { io } from 'socket.io-client';

const Chatbot = () => {
  const initialMessages = [
    { text: 'Welcome to our website!', isBot: true },
    { text: 'How can I assist you today?', isBot: true }
  ];

  const defaultQuestions = [
    "What's your name?",
    "Where are you from?",
    "What's your phone number?",
    "Thank you, our team will get in touch with you."
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [typing, setTyping] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [socket, setSocket] = useState(null); // State to hold the socket instance

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showChat) {
      startNewChat();
    } else {
      disconnectSocket();
    }
  }, [showChat]);

  const startNewChat = async () => {
    try {
      const response = await axios.post('/api/chats');
      setChatId(response.data._id);

      const newSocket = io('http://localhost:5000', {
        transports: ['websocket'],
      });

      newSocket.on('connect', () => {
        console.log('Socket connected');
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      newSocket.on('botMessage', handleBotMessage);

      setSocket(newSocket);
    } catch (error) {
      console.error('Error starting new chat:', error);
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput('');

    try {
      await axios.post(`/api/chats/${chatId}/messages`, { text: input, isBot: false });
    } catch (error) {
      console.error('Error sending message:', error);
    }

    if (step < defaultQuestions.length) {
      setTyping(true);
      setTimeout(async () => {
        setTyping(false);
        const botMessage = { text: defaultQuestions[step], isBot: true };
        setMessages([...newMessages, botMessage]);
        setStep(step + 1);

        try {
          await axios.post(`/api/chats/${chatId}/messages`, botMessage);
          socket.emit('botMessage', botMessage); // Emit bot message to server
        } catch (error) {
          console.error('Error sending bot message:', error);
        }
      }, 1000);
    }
  };

  const handleRestartChat = async () => {
    setMessages(initialMessages);
    setStep(0);
    setTyping(false);
    setChatId(null);
    disconnectSocket();
    await startNewChat();
  };

  const handleToggleChat = () => {
    setShowChat(prev => !prev);
  };

  const handleBotMessage = (botMessage) => {
    const newMessages = [...messages, botMessage];
    setMessages(newMessages);
    scrollToBottom();
  };

  return (
    <Portal>
      <Box position="fixed" bottom="20px" right="20px" zIndex={9999}>
        {!showChat && (
          <IconButton
            icon={<FaCommentDots />}
            isRound
            size="lg"
            colorScheme="teal"
            onClick={handleToggleChat}
          />
        )}
        {showChat && (
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            w="350px"
            h="450px"
            bg="white"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <VStack spacing={3} align="stretch" overflowY="auto" h="350px">
              {messages.map((msg, index) => (
                <Text
                  key={index}
                  alignSelf={msg.isBot ? 'flex-start' : 'flex-end'}
                  bg={msg.isBot ? 'gray.200' : 'blue.200'}
                  p={2}
                  borderRadius="md"
                  maxW="80%"
                >
                  {msg.text}
                </Text>
              ))}
              {typing && (
                <HStack>
                  <Spinner size="xs" />
                  <Text>Typing...</Text>
                </HStack>
              )}
              <div ref={chatEndRef} />
            </VStack>
            <Box mt={4} display="flex">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button ml={2} onClick={handleSendMessage}>
                Send
              </Button>
              <Button ml={2} colorScheme="red" onClick={handleToggleChat}>
                Close
              </Button>
            </Box>
            {step === defaultQuestions.length && (
              <Button mt={2} onClick={handleRestartChat} colorScheme="teal">
                Restart Chat
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Portal>
  );
};

export default Chatbot;
