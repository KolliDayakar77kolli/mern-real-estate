import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  VStack,
  HStack,
  Divider,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { FaTrash, FaCheck, FaBell } from 'react-icons/fa';
import { io } from 'socket.io-client';
import AdminHeader from '../components/Miscellaneous/AdminHeader';

const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const [socket, setSocket] = useState(null); // State to hold the socket instance
  const [selectedChat, setSelectedChat] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const newSocket = io('http://localhost:5000');

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    newSocket.on('newChat', (newChat) => {
      setChats(prevChats => [...prevChats, newChat]);
      if (!newChat.isRead) {
        setNotifications(prevNotifications => prevNotifications + 1);
      }
    });

    setSocket(newSocket);

    // Fetch chats from the database
    async function fetchChats() {
      try {
        const response = await axios.get('/api/chats');
        setChats(response.data); // Assuming the response contains an array of chats
      } catch (error) {
        console.error('Error fetching chats:', error);
        toast({
          title: 'Error fetching chats',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }

    fetchChats();

    return () => {
      newSocket.disconnect();
    };
  }, [toast]);

  const handleDeleteChat = async (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      try {
        await axios.delete(`/api/chats/${chatId}`);
        setChats(chats.filter(chat => chat._id !== chatId));
        toast({
          title: 'Chat deleted',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error deleting chat:', error);
        toast({
          title: 'Error deleting chat',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
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
      setNotifications(prevNotifications => prevNotifications - 1);
      toast({
        title: 'Chat marked as read',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error marking chat as read:', error);
      toast({
        title: 'Error marking chat as read',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  const handleChatSessionClick = (chat) => {
    setSelectedChat(chat);
    if (!chat.isRead) {
      handleMarkAsRead(chat._id);
    }
  };

  return (
    <>
    <AdminHeader/>
    <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="lg">
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          All Chats
        </Text>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaBell size={24} />}
            variant="ghost"
            onClick={handleNotificationClick}
            aria-label="Notifications"
          >
            {notifications > 0 && (
              <Badge colorScheme="red" borderRadius="full">
                {notifications}
              </Badge>
            )}
          </MenuButton>
          <MenuList>
            {chats.map((chat, index) => (
              <MenuItem key={index} onClick={() => handleChatSessionClick(chat)}>
                Chat Session {index + 1}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
      <VStack spacing={4} align="stretch" overflowY="auto" maxH="600px">
        {chats.length === 0 && (
          <Text fontSize="lg" fontStyle="italic">
            No chats available
          </Text>
        )}
        {selectedChat && (
          <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="gray.50">
            <HStack justifyContent="space-between">
              <Text fontSize="lg" fontWeight="bold">Chat Session {selectedChat._id}</Text>
              <HStack spacing={2}>
                <IconButton
                  icon={<FaCheck />}
                  colorScheme={selectedChat.isRead ? 'green' : 'gray'}
                  onClick={() => handleMarkAsRead(selectedChat._id)}
                  isRound
                  aria-label="Mark as Read"
                />
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => handleDeleteChat(selectedChat._id)}
                  isRound
                  aria-label="Delete Chat"
                />
              </HStack>
            </HStack>
            {selectedChat.messages.map((msg, msgIndex) => (
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
        )}
        {chats.map((chat, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="gray.50">
            <HStack justifyContent="space-between">
              <Text fontSize="lg" fontWeight="bold">Chat Session {index + 1}</Text>
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
    </>
  );
};

export default AdminChat;





// dropdown
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Text,
//   VStack,
//   HStack,
//   Divider,
//   IconButton,
//   Badge,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   useToast,
// } from '@chakra-ui/react';
// import { FaTrash, FaCheck, FaBell } from 'react-icons/fa';
// import { io } from 'socket.io-client';

// const AdminChat = () => {
//   const [chats, setChats] = useState([]);
//   const [notifications, setNotifications] = useState(0);
//   const [socket, setSocket] = useState(null); // State to hold the socket instance
//   const [selectedChat, setSelectedChat] = useState(null);
//   const toast = useToast();

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000');

//     newSocket.on('connect', () => {
//       console.log('Socket connected');
//     });

//     newSocket.on('disconnect', () => {
//       console.log('Socket disconnected');
//     });

//     newSocket.on('newChat', (newChat) => {
//       setChats(prevChats => [...prevChats, newChat]);
//       if (!newChat.isRead) {
//         setNotifications(prevNotifications => prevNotifications + 1);
//       }
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const handleDeleteChat = async (chatId) => {
//     if (window.confirm('Are you sure you want to delete this chat?')) {
//       try {
//         await axios.delete(`/api/chats/${chatId}`);
//         setChats(chats.filter(chat => chat._id !== chatId));
//         toast({
//           title: 'Chat deleted',
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       } catch (error) {
//         console.error('Error deleting chat:', error);
//         toast({
//           title: 'Error deleting chat',
//           description: error.message,
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     }
//   };

//   const handleMarkAsRead = async (chatId) => {
//     try {
//       await axios.put(`/api/chats/${chatId}/markAsRead`);
//       const updatedChats = chats.map(chat =>
//         chat._id === chatId ? { ...chat, isRead: true } : chat
//       );
//       setChats(updatedChats);
//       setNotifications(prevNotifications => prevNotifications - 1);
//       toast({
//         title: 'Chat marked as read',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (error) {
//       console.error('Error marking chat as read:', error);
//       toast({
//         title: 'Error marking chat as read',
//         description: error.message,
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleNotificationClick = () => {
//     setNotifications(0);
//   };

//   const handleChatSessionClick = (chat) => {
//     setSelectedChat(chat);
//     if (!chat.isRead) {
//       handleMarkAsRead(chat._id);
//     }
//   };

//   return (
//     <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="lg">
//       <HStack justifyContent="space-between">
//         <Text fontSize="xl" fontWeight="bold" mb={4}>
//           All Chats
//         </Text>
//         <Menu>
//           <MenuButton
//             as={IconButton}
//             icon={<FaBell size={24} />}
//             variant="ghost"
//             onClick={handleNotificationClick}
//             aria-label="Notifications"
//           >
//             {notifications > 0 && (
//               <Badge colorScheme="red" borderRadius="full">
//                 {notifications}
//               </Badge>
//             )}
//           </MenuButton>
//           <MenuList>
//             {chats.map((chat, index) => (
//               <MenuItem key={index} onClick={() => handleChatSessionClick(chat)}>
//                 Chat Session {index + 1}
//               </MenuItem>
//             ))}
//           </MenuList>
//         </Menu>
//       </HStack>
//       <VStack spacing={4} align="stretch" overflowY="auto" maxH="600px">
//         {chats.length === 0 && (
//           <Text fontSize="lg" fontStyle="italic">
//             No chats available
//           </Text>
//         )}
//         {selectedChat && (
//           <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="gray.50">
//             <HStack justifyContent="space-between">
//               <Text fontSize="lg" fontWeight="bold" mb={2}>Chat Session {selectedChat._id}</Text>
//               <HStack spacing={2}>
//                 <IconButton
//                   icon={<FaCheck />}
//                   colorScheme={selectedChat.isRead ? 'green' : 'gray'}
//                   onClick={() => handleMarkAsRead(selectedChat._id)}
//                   isRound
//                   aria-label="Mark as Read"
//                 />
//                 <IconButton
//                   icon={<FaTrash />}
//                   colorScheme="red"
//                   onClick={() => handleDeleteChat(selectedChat._id)}
//                   isRound
//                   aria-label="Delete Chat"
//                 />
//               </HStack>
//             </HStack>
//             {selectedChat.messages.map((msg, msgIndex) => (
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
//         )}
//       </VStack>
//     </Box>
//   );
// };

// export default AdminChat;













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Text, VStack, HStack, Divider, IconButton, Badge } from '@chakra-ui/react';
// import { FaTrash, FaCheck, FaBell } from 'react-icons/fa';
// import { io } from 'socket.io-client';

// const AdminChat = () => {
//   const [chats, setChats] = useState([]);
//   const [notifications, setNotifications] = useState(0);
//   const [socket, setSocket] = useState(null); // State to hold the socket instance

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000');

//     newSocket.on('connect', () => {
//       console.log('Socket connected');
//     });

//     newSocket.on('disconnect', () => {
//       console.log('Socket disconnected');
//     });

//     newSocket.on('newChat', (newChat) => {
//       setChats(prevChats => [...prevChats, newChat]);
//       if (!newChat.isRead) {
//         setNotifications(prevNotifications => prevNotifications + 1);
//       }
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
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

//   const handleMarkAsRead = async (chatId) => {
//     try {
//       await axios.put(`/api/chats/${chatId}/markAsRead`);
//       const updatedChats = chats.map(chat =>
//         chat._id === chatId ? { ...chat, isRead: true } : chat
//       );
//       setChats(updatedChats);
//       if (!updatedChats.find(chat => chat._id === chatId).isRead) {
//         setNotifications(prevNotifications => prevNotifications - 1);
//       }
//     } catch (error) {
//       console.error('Error marking chat as read:', error);
//     }
//   };

//   const handleNotificationClick = () => {
//     setNotifications(0);
//   };

//   return (
//     <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="lg">
//       <HStack justifyContent="space-between">
//         <Text fontSize="xl" fontWeight="bold" mb={4}>
//           All Chats
//         </Text>
//         <IconButton
//           icon={<FaBell size={24} />}
//           variant="ghost"
//           onClick={handleNotificationClick}
//         >
//           {notifications > 0 && (
//             <Badge colorScheme="red" borderRadius="full">
//               {notifications}
//             </Badge>
//           )}
//         </IconButton>
//       </HStack>
//       <VStack spacing={4} align="stretch" overflowY="auto" maxH="600px">
//         {chats.length === 0 && (
//           <Text fontSize="lg" fontStyle="italic">
//             No chats available
//           </Text>
//         )}
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


















// most
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Text, VStack, HStack, Divider, IconButton, Badge } from '@chakra-ui/react';
// import { FaTrash, FaCheck, FaBell } from 'react-icons/fa';
// import { io } from 'socket.io-client';

// const AdminChat = () => {
//   const [chats, setChats] = useState([]);
//   const [notifications, setNotifications] = useState(0);
//   const socket = io('http://localhost:5000'); // Adjust the URL as necessary

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

//     socket.on('newChat', (newChat) => {
//       setChats(prevChats => [...prevChats, newChat]);
//       setNotifications(prevNotifications => prevNotifications + 1);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

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

//   const handleMarkAsRead = async (chatId) => {
//     try {
//       await axios.put(`/api/chats/${chatId}/markAsRead`);
//       const updatedChats = chats.map(chat =>
//         chat._id === chatId ? { ...chat, isRead: true } : chat
//       );
//       setChats(updatedChats);
//     } catch (error) {
//       console.error('Error marking chat as read:', error);
//     }
//   };

//   const handleNotificationClick = () => {
//     setNotifications(0);
//   };

//   return (
//     <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="lg">
//       <HStack justifyContent="space-between">
//         <Text fontSize="xl" fontWeight="bold" mb={4}>
//           All Chats
//         </Text>
//         <IconButton
//           icon={<FaBell size={24} />}
//           variant="ghost"
//           onClick={handleNotificationClick}
//         >
//           <Badge colorScheme="red" borderRadius="full">
//             {notifications > 0 ? notifications : 0}
//           </Badge>
//         </IconButton>
//       </HStack>
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








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Text, VStack, HStack, Divider, IconButton, Badge } from '@chakra-ui/react';
// import { FaTrash, FaCheck, FaBell } from 'react-icons/fa';
// import { io } from 'socket.io-client';

// const AdminChat = () => {
//   const [chats, setChats] = useState([]);
//   const [notifications, setNotifications] = useState(0);
//   const socket = io('http://localhost:5000'); // Adjust the URL as necessary

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

//     socket.on('newChat', (newChat) => {
//       setChats(prevChats => [...prevChats, newChat]);
//       setNotifications(prevNotifications => prevNotifications + 1);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

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

//   const handleMarkAsRead = async (chatId) => {
//     try {
//       await axios.put(`/api/chats/${chatId}/markAsRead`);
//       const updatedChats = chats.map(chat =>
//         chat._id === chatId ? { ...chat, isRead: true } : chat
//       );
//       setChats(updatedChats);
//     } catch (error) {
//       console.error('Error marking chat as read:', error);
//     }
//   };

//   const handleNotificationClick = () => {
//     setNotifications(0);
//   };

//   return (
//     <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="lg">
//       <HStack justifyContent="space-between">
//         <Text fontSize="xl" fontWeight="bold" mb={4}>
//           All Chats
//         </Text>
//         <IconButton
//           icon={<FaBell size={24} />}
//           variant="ghost"
//           onClick={handleNotificationClick}
//         >
//           <Badge colorScheme="red" borderRadius="full">
//             {notifications > 0 ? notifications : 0}
//           </Badge>
//         </IconButton>
//       </HStack>
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












// // src/components/AdminChat.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Text, VStack, HStack, Divider, Button, IconButton, Badge } from '@chakra-ui/react';
// import { FaTrash, FaCheck, FaBell } from 'react-icons/fa';
// import { io } from 'socket.io-client';

// const AdminChat = () => {
//   const [chats, setChats] = useState([]);
//   const [notifications, setNotifications] = useState(0);
//   const socket = io('http://localhost:5000'); // Adjust the URL as necessary

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

//     socket.on('newChat', (newChat) => {
//       setChats(prevChats => [...prevChats, newChat]);
//       setNotifications(prevNotifications => prevNotifications + 1);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

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

//   const handleMarkAsRead = async (chatId) => {
//     try {
//       await axios.put(`/api/chats/${chatId}/markAsRead`);
//       const updatedChats = chats.map(chat => 
//         chat._id === chatId ? { ...chat, isRead: true } : chat
//       );
//       setChats(updatedChats);
//     } catch (error) {
//       console.error('Error marking chat as read:', error);
//     }
//   };

//   const handleNotificationClick = () => {
//     setNotifications(0);
//   };

//   return (
//     <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="lg">
//       <HStack justifyContent="space-between">
//         <Text fontSize="xl" fontWeight="bold" mb={4}>
//           All Chats
//         </Text>
//         <Button onClick={handleNotificationClick} variant="ghost" position="relative">
//           <FaBell size={24} />
//           {notifications > 0 && (
//             <Badge colorScheme="red" borderRadius="full" position="absolute" top="-1" right="-1">
//               {notifications}
//             </Badge>
//           )}
//         </Button>
//       </HStack>
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

//   const handleMarkAsRead = async (chatId) => {
//     try {
//       await axios.put(`/api/chats/${chatId}/markAsRead`);
//       const updatedChats = chats.map(chat => 
//         chat._id === chatId ? { ...chat, isRead: true } : chat
//       );
//       setChats(updatedChats);
//     } catch (error) {
//       console.error('Error marking chat as read:', error);
//     }
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

