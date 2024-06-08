// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Input, Text, VStack, IconButton, HStack, Spinner } from '@chakra-ui/react';
import { FaCommentDots } from 'react-icons/fa';
import axios from 'axios';

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

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewChat = async () => {
    try {
      const response = await axios.post('/api/chats');
      setChatId(response.data._id);
    } catch (error) {
      console.error('Error starting new chat:', error);
    }
  };

  useEffect(() => {
    if (showChat && !chatId) {
      startNewChat();
    }
  }, [showChat]);

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
    await startNewChat();
  };

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex={10}>
      {!showChat && (
        <IconButton
          icon={<FaCommentDots />}
          isRound
          size="lg"
          colorScheme="teal"
          onClick={() => setShowChat(true)}
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
            <Button ml={2} colorScheme="red" onClick={() => setShowChat(false)}>
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
  );
};

export default Chatbot;











// // src/components/Chatbot.js
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Box, Button, Input, Text, VStack, IconButton, HStack, Spinner } from '@chakra-ui/react';
// import { FaCommentDots } from 'react-icons/fa';

// const Chatbot = () => {
//   const initialMessages = [
//     { text: 'Welcome to our website!', isBot: true },
//     { text: 'How can I assist you today?', isBot: true }
//   ];

//   const defaultQuestions = [
//     "What's your name?",
//     "Where are you from?",
//     "What's your phone number?",
//     "Thank you, our team will get in touch with you."
//   ];

//   const [chatId, setChatId] = useState('');
//   const [messages, setMessages] = useState(initialMessages);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState(0);
//   const [showChat, setShowChat] = useState(false);
//   const [typing, setTyping] = useState(false);

//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     const startNewChat = async () => {
//       try {
//         const response = await axios.post('/api/chats');
//         setChatId(response.data._id);
//       } catch (error) {
//         console.error('Error starting new chat:', error);
//       }
//     };

//     startNewChat();
//   }, []);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const response = await axios.get('/api/chats');
//         if (response.data.length > 0) {
//           const lastChat = response.data[response.data.length - 1];
//           setChatId(lastChat._id);
//           const allMessages = lastChat.messages.map(msg => ({
//             text: msg.text,
//             isBot: msg.isBot
//           }));
//           setMessages(allMessages);
//         }
//       } catch (error) {
//         console.error('Error fetching chats:', error);
//       }
//     };

//     fetchChats();
//   }, []);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { text: input, isBot: false }];
//     setMessages(newMessages);
//     setInput('');

//     if (step < defaultQuestions.length) {
//       setTyping(true);
//       try {
//         await axios.post(`/api/chats/${chatId}/messages`, { text: input, isBot: false });
//         setTyping(false);
//         setMessages([...newMessages, { text: defaultQuestions[step], isBot: true }]);
//         setStep(step + 1);
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     }
//   };

//   const handleRestartChat = async () => {
//     try {
//       await axios.patch(`/api/chats/${chatId}/close`);
//       await axios.post('/api/chats');
//       setMessages(initialMessages);
//       setStep(0);
//       setTyping(false);
//     } catch (error) {
//       console.error('Error restarting chat:', error);
//     }
//   };

//   return (
//     <Box position="fixed" bottom="20px" right="20px" zIndex={10}>
//       {!showChat && (
//         <IconButton
//           icon={<FaCommentDots />}
//           isRound
//           size="lg"
//           colorScheme="teal"
//           onClick={() => setShowChat(true)}
//         />
//       )}
//       {showChat && (
//         <Box
//           p={4}
//           borderWidth="1px"
//           borderRadius="lg"
//           w="350px"
//           h="450px"
//           bg="white"
//           boxShadow="lg"
//           display="flex"
//           flexDirection="column"
//           justifyContent="space-between"
//         >
//           <VStack spacing={3} align="stretch" overflowY="auto" h="350px">
//             {messages.map((msg, index) => (
//               <Text
//                 key={index}
//                 alignSelf={msg.isBot ? 'flex-start' : 'flex-end'}
//                 bg={msg.isBot ? 'gray.200' : 'blue.200'}
//                 p={2}
//                 borderRadius="md"
//                 maxW="80%"
//               >
//                 {msg.text}
//               </Text>
//             ))}
//             {typing && (
//               <HStack>
//                 <Spinner size="xs" />
//                 <Text>Typing...</Text>
//               </HStack>
//             )}
//             <div ref={chatEndRef} />
//           </VStack>
//           <Box mt={4} display="flex">
//             <Input
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//             />
//             <Button ml={2} onClick={handleSendMessage}>
//               Send
//             </Button>
//             <Button ml={2} colorScheme="red" onClick={() => setShowChat(false)}>
//               Close
//             </Button>
//           </Box>
//           {step === defaultQuestions.length && (
//             <Button mt={2} onClick={handleRestartChat} colorScheme="teal">
//               Restart Chat
//             </Button>
//           )}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Chatbot;


















// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Button, Input, Text, VStack, IconButton, HStack, Spinner } from '@chakra-ui/react';
// import { FaCommentDots } from 'react-icons/fa';

// const Chatbot = () => {
//   const initialMessages = [
//     { text: 'Welcome to our website!', isBot: true },
//     { text: 'How can I assist you today?', isBot: true }
//   ];

//   const defaultQuestions = [
//     "What's your name?",
//     "Where are you from?",
//     "What's your phone number?",
//     "Thank you, our team will get in touch with you."
//   ];

//   const [messages, setMessages] = useState(initialMessages);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState(0);
//   const [showChat, setShowChat] = useState(false);
//   const [typing, setTyping] = useState(false);

//   const chatEndRef = useRef(null);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { text: input, isBot: false }];
//     setMessages(newMessages);
//     setInput('');

//     if (step < defaultQuestions.length) {
//       setTyping(true);
//       setTimeout(() => {
//         setTyping(false);
//         setMessages([...newMessages, { text: defaultQuestions[step], isBot: true }]);
//         setStep(step + 1);
//       }, 1000);
//     }
//   };

//   const handleRestartChat = () => {
//     setMessages(initialMessages);
//     setStep(0);
//     setTyping(false);
//   };

//   return (
//     <Box position="fixed" bottom="20px" right="20px" zIndex={10}>
//       {!showChat && (
//         <IconButton
//           icon={<FaCommentDots />}
//           isRound
//           size="lg"
//           colorScheme="teal"
//           onClick={() => setShowChat(true)}
//         />
//       )}
//       {showChat && (
//         <Box
//           p={4}
//           borderWidth="1px"
//           borderRadius="lg"
//           w="350px"
//           h="450px"
//           bg="white"
//           boxShadow="lg"
//           display="flex"
//           flexDirection="column"
//           justifyContent="space-between"
//         >
//           <VStack spacing={3} align="stretch" overflowY="auto" h="350px">
//             {messages.map((msg, index) => (
//               <Text
//                 key={index}
//                 alignSelf={msg.isBot ? 'flex-start' : 'flex-end'}
//                 bg={msg.isBot ? 'gray.200' : 'blue.200'}
//                 p={2}
//                 borderRadius="md"
//                 maxW="80%"
//               >
//                 {msg.text}
//               </Text>
//             ))}
//             {typing && (
//               <HStack>
//                 <Spinner size="xs" />
//                 <Text>Typing...</Text>
//               </HStack>
//             )}
//             <div ref={chatEndRef} />
//           </VStack>
//           <Box mt={4} display="flex">
//             <Input
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//             />
//             <Button ml={2} onClick={handleSendMessage}>
//               Send
//             </Button>
//             <Button ml={2} colorScheme="red" onClick={() => setShowChat(false)}>
//               Close
//             </Button>
//           </Box>
//           {step === defaultQuestions.length && (
//             <Button mt={2} onClick={handleRestartChat} colorScheme="teal">
//               Restart Chat
//             </Button>
//           )}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Chatbot;