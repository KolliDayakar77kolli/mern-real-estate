// src/components/AdminChat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, VStack, HStack, Divider, Button, IconButton } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const AdminChat = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/api/chats');
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  const handleDeleteChat = async (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      try {
        await axios.delete(`/api/chats/${chatId}`);
        setChats(chats.filter(chat => chat._id !== chatId));
      } catch (error) {
        console.error('Error deleting chat:', error);
      }
    }
  };

  const handleMarkAsRead = async (chatId) => {
    try {
      await axios.put(`/api/chats/${chatId}/markAsRead`);
      const updatedChats = chats.map(chat => 
        chat._id === chatId ? { ...chat, isRead: true } : chat
      );
      setChats(updatedChats);
    } catch (error) {
      console.error('Error marking chat as read:', error);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="lg">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        All Chats
      </Text>
      <VStack spacing={4} align="stretch" overflowY="auto" maxH="600px">
        {chats.map((chat, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="gray.50">
            <HStack justifyContent="space-between">
              <Text fontSize="lg" fontWeight="bold" mb={2}>Chat Session {index + 1}</Text>
              <HStack spacing={2}>
                <IconButton
                  icon={<FaCheck />}
                  colorScheme={chat.isRead ? 'green' : 'gray'}
                  onClick={() => handleMarkAsRead(chat._id)}
                  isRound
                  aria-label="Mark as Read"
                />
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => handleDeleteChat(chat._id)}
                  isRound
                  aria-label="Delete Chat"
                />
              </HStack>
            </HStack>
            {chat.messages.map((msg, msgIndex) => (
              <HStack key={msgIndex} alignSelf={msg.isBot ? 'flex-start' : 'flex-end'}>
                <Text
                  alignSelf={msg.isBot ? 'flex-start' : 'flex-end'}
                  bg={msg.isBot ? 'gray.200' : 'blue.200'}
                  p={2}
                  borderRadius="md"
                  maxW="80%"
                >
                  {msg.text}
                </Text>
              </HStack>
            ))}
            <Divider mt={2} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AdminChat;







// // working
// // src/components/AdminChat.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Text, VStack, HStack, Divider, Button, IconButton } from '@chakra-ui/react';
// import { FaTrash, FaCheck } from 'react-icons/fa';

// const AdminChat = () => {
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const response = await axios.get('/api/chats');
//         setChats(response.data);
//       } catch (error) {
//         console.error('Error fetching chats:', error);
//       }
//     };

//     fetchChats();
//   }, []);

//   const handleDeleteChat = async (chatId) => {
//     if (window.confirm('Are you sure you want to delete this chat?')) {
//       try {
//         await axios.delete(`/api/chats/${chatId}`);
//         setChats(chats.filter(chat => chat._id !== chatId));
//       } catch (error) {
//         console.error('Error deleting chat:', error);
//       }
//     }
//   };

//   const handleMarkAsRead = (chatId) => {
//     // Simulate marking as read action with a simple animation or visual change
//     const updatedChats = chats.map(chat => 
//       chat._id === chatId ? { ...chat, isRead: true } : chat
//     );
//     setChats(updatedChats);
//   };

//   return (
//     <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="lg">
//       <Text fontSize="xl" fontWeight="bold" mb={4}>
//         All Chats
//       </Text>
//       <VStack spacing={4} align="stretch" overflowY="auto" maxH="600px">
//         {chats.map((chat, index) => (
//           <Box key={index} p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="gray.50">
//             <HStack justifyContent="space-between">
//               <Text fontSize="lg" fontWeight="bold" mb={2}>Chat Session {index + 1}</Text>
//               <HStack spacing={2}>
//                 <IconButton
//                   icon={<FaCheck />}
//                   colorScheme={chat.isRead ? 'green' : 'gray'}
//                   onClick={() => handleMarkAsRead(chat._id)}
//                   isRound
//                   aria-label="Mark as Read"
//                 />
//                 <IconButton
//                   icon={<FaTrash />}
//                   colorScheme="red"
//                   onClick={() => handleDeleteChat(chat._id)}
//                   isRound
//                   aria-label="Delete Chat"
//                 />
//               </HStack>
//             </HStack>
//             {chat.messages.map((msg, msgIndex) => (
//               <HStack key={msgIndex} alignSelf={msg.isBot ? 'flex-start' : 'flex-end'}>
//                 <Text
//                   alignSelf={msg.isBot ? 'flex-start' : 'flex-end'}
//                   bg={msg.isBot ? 'gray.200' : 'blue.200'}
//                   p={2}
//                   borderRadius="md"
//                   maxW="80%"
//                 >
//                   {msg.text}
//                 </Text>
//               </HStack>
//             ))}
//             <Divider mt={2} />
//           </Box>
//         ))}
//       </VStack>
//     </Box>
//   );
// };

// export default AdminChat;











// // working fine............
// // src/components/AdminChat.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Text, VStack, HStack, Divider } from '@chakra-ui/react';

// const AdminChat = () => {
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const response = await axios.get('/api/chats');
//         setChats(response.data);
//       } catch (error) {
//         console.error('Error fetching chats:', error);
//       }
//     };

//     fetchChats();
//   }, []);

//   return (
//     <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="lg">
//       <Text fontSize="xl" fontWeight="bold" mb={4}>
//         All Chats
//       </Text>
//       <VStack spacing={4} align="stretch" overflowY="auto" maxH="600px">
//         {chats.map((chat, index) => (
//           <Box key={index} p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="gray.50">
//             <Text fontSize="lg" fontWeight="bold" mb={2}>Chat Session {index + 1}</Text>
//             {chat.messages.map((msg, msgIndex) => (
//               <HStack key={msgIndex} alignSelf={msg.isBot ? 'flex-start' : 'flex-end'}>
//                 <Text
//                   alignSelf={msg.isBot ? 'flex-start' : 'flex-end'}
//                   bg={msg.isBot ? 'gray.200' : 'blue.200'}
//                   p={2}
//                   borderRadius="md"
//                   maxW="80%"
//                 >
//                   {msg.text}
//                 </Text>
//               </HStack>
//             ))}
//             <Divider mt={2} />
//           </Box>
//         ))}
//       </VStack>
//     </Box>
//   );
// };

// export default AdminChat;

















// import React, { useEffect, useState } from 'react';
// import { Box, Text, VStack, HStack, Badge, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
// import { BellIcon } from '@chakra-ui/icons';
// import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// const Admin = () => {
//   const [sessions, setSessions] = useState([]);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     fetchSessions();
    
//     socket.on('newMessage', (data) => {
//       setNotifications((prev) => [...prev, data]);
//       fetchSessions();
//     });

//     return () => {
//       socket.off('newMessage');
//     };
//   }, []);

//   const fetchSessions = async () => {
//     try {
//       const response = await axios.get('/api/sessions');
//       setSessions(response.data);
//     } catch (error) {
//       console.error('Error fetching sessions:', error);
//     }
//   };

//   const handleNotificationClick = () => {
//     fetchSessions();
//     setNotifications([]);
//   };

//   return (
//     <Box p={4}>
//       <HStack justifyContent="space-between">
//         <Text fontSize="2xl">Admin Dashboard</Text>
//         <Menu>
//           <MenuButton as={IconButton} icon={<BellIcon />} colorScheme="teal" />
//           <MenuList>
//             {notifications.length > 0 ? (
//               notifications.map((notification, index) => (
//                 <MenuItem key={index} onClick={handleNotificationClick}>
//                   New message from {notification.sessionId}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem>No new notifications</MenuItem>
//             )}
//           </MenuList>
//         </Menu>
//       </HStack>
//       <VStack spacing={4} mt={4}>
//         {sessions.map((session) => (
//           <Box key={session._id} borderWidth="1px" borderRadius="lg" p={4} w="100%">
//             <Text fontSize="lg" fontWeight="bold">Session ID: {session.sessionId}</Text>
//             <VStack align="stretch" mt={2}>
//               {session.messages.map((msg, index) => (
//                 <HStack key={index} justify={msg.isBot ? 'flex-start' : 'flex-end'}>
//                   <Badge colorScheme={msg.isBot ? 'green' : 'blue'}>{msg.text}</Badge>
//                 </HStack>
//               ))}
//             </VStack>
//           </Box>
//         ))}
//       </VStack>
//     </Box>
//   );
// };

// export default Admin;

