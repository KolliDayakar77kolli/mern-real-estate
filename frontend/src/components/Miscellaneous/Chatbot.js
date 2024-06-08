// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Input, Text, VStack, IconButton, HStack, Spinner } from '@chakra-ui/react';
import { FaCommentDots } from 'react-icons/fa';

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

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput('');

    if (step < defaultQuestions.length) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([...newMessages, { text: defaultQuestions[step], isBot: true }]);
        setStep(step + 1);
      }, 1000);
    }
  };

  const handleRestartChat = () => {
    setMessages(initialMessages);
    setStep(0);
    setTyping(false);
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
// import React, { useState, useEffect } from 'react';
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
//             {step === defaultQuestions.length && (
//               <Button onClick={handleRestartChat} colorScheme="teal">
//                 Restart Chat
//               </Button>
//             )}
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
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Chatbot;

















// // src/components/Chatbot.js
// import React, { useState, useEffect } from 'react';
// import { Box, Button, Input, Text, VStack, IconButton, HStack, Spinner } from '@chakra-ui/react';
// import { FaCommentDots } from 'react-icons/fa';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { text: 'Welcome to our website!', isBot: true },
//     { text: 'How can I assist you today?', isBot: true }
//   ]);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState(0);
//   const [showChat, setShowChat] = useState(false);
//   const [typing, setTyping] = useState(false);

//   const defaultQuestions = [
//     "What's your name?",
//     "Where are you from?",
//     "What's your phone number?",
//     "Thank you, our team will get in touch with you."
//   ];

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
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Chatbot;












// // src/components/Chatbot.js
// import React, { useState } from 'react';
// import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { text: 'Welcome to our website!', isBot: true },
//     { text: 'How can I assist you today?', isBot: true }
//   ]);
//   const [input, setInput] = useState('');
//   const [step, setStep] = useState(0);
  
//   const defaultQuestions = [
//     "What's your name?",
//     "Where are you from?",
//     "What's your phone number?"
//   ];

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { text: input, isBot: false }];
//     setMessages(newMessages);
//     setInput('');

//     if (step < defaultQuestions.length) {
//       setTimeout(() => {
//         setMessages([...newMessages, { text: defaultQuestions[step], isBot: true }]);
//         setStep(step + 1);
//       }, 1000);
//     }
//   };

//   return (
//     <Box p={4} borderWidth="1px" borderRadius="lg" w="400px" h="500px" overflowY="auto">
//       <VStack spacing={3}>
//         {messages.map((msg, index) => (
//           <Text key={index} alignSelf={msg.isBot ? 'flex-start' : 'flex-end'} bg={msg.isBot ? 'gray.200' : 'blue.200'} p={2} borderRadius="md">
//             {msg.text}
//           </Text>
//         ))}
//       </VStack>
//       <Box mt={4} display="flex">
//         <Input
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//         />
//         <Button ml={2} onClick={handleSendMessage}>
//           Send
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Chatbot;
