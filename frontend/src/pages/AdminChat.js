import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import { FaTrash, FaCheck, FaBell } from "react-icons/fa";
import { io } from "socket.io-client";
import AdminHeader from "../components/Miscellaneous/AdminHeader";

const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const [socket, setSocket] = useState(null); // State to hold the socket instance
  const [selectedChat, setSelectedChat] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const newSocket = io("http://localhost:5000");

    newSocket.on("connect", () => {
      console.log("Socket connected");
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    newSocket.on("newChat", (newChat) => {
      setChats((prevChats) => [...prevChats, newChat]);
      if (!newChat.isRead) {
        setNotifications((prevNotifications) => prevNotifications + 1);
      }
    });

    setSocket(newSocket);

    // Fetch chats from the database
    async function fetchChats() {
      try {
        const response = await axios.get("/api/chats");
        setChats(response.data); // Assuming the response contains an array of chats

        // Count unread chats to set notifications count
        const unreadChats = response.data.filter((chat) => !chat.isRead);
        setNotifications(unreadChats.length);
      } catch (error) {
        console.error("Error fetching chats:", error);
        toast({
          title: "Error fetching chats",
          description: error.message,
          status: "error",
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
    if (window.confirm("Are you sure you want to delete this chat?")) {
      try {
        await axios.delete(`/api/chats/${chatId}`);
        setChats(chats.filter((chat) => chat._id !== chatId));

        // If the deleted chat was unread, decrement notifications count
        const deletedChat = chats.find((chat) => chat._id === chatId);
        if (deletedChat && !deletedChat.isRead) {
          setNotifications((prevNotifications) =>
            prevNotifications > 0 ? prevNotifications - 1 : 0
          );
        }

        toast({
          title: "Chat deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error deleting chat:", error);
        toast({
          title: "Error deleting chat",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleMarkAsRead = async (chatId) => {
    try {
      await axios.put(`/api/chats/${chatId}/markAsRead`);
      const updatedChats = chats.map((chat) =>
        chat._id === chatId ? { ...chat, isRead: true } : chat
      );
      setChats(updatedChats);
      setNotifications((prevNotifications) =>
        prevNotifications > 0 ? prevNotifications - 1 : 0
      );
      toast({
        title: "Chat marked as read",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error marking chat as read:", error);
      toast({
        title: "Error marking chat as read",
        description: error.message,
        status: "error",
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
      <AdminHeader />
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        w="100%"
        bg="white"
        boxShadow="lg"
      >
        <HStack justifyContent="space-between" mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            All Chats
          </Text>
          <Menu>
            <MenuButton
              as={Box}
              position="relative"
              aria-label="Notifications"
              onClick={handleNotificationClick}
            >
              <IconButton
                icon={<FaBell size={24} />}
                variant="ghost"
                aria-label="Notifications"
              />
              <Badge
                colorScheme="red"
                borderRadius="full"
                fontSize="0.8em"
                position="absolute"
                top="-1"
                right="-1"
              >
                {notifications}
              </Badge>
            </MenuButton>

            <MenuList>
              {chats.length > 0 ? (
                chats.map((chat, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleChatSessionClick(chat)}
                  >
                    Chat Session {index + 1}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No chats available</MenuItem>
              )}
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
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              w="100%"
              bg="gray.50"
            >
              <HStack justifyContent="space-between">
                <Text fontSize="lg" fontWeight="bold">
                  Chat Session {selectedChat._id}
                </Text>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FaCheck />}
                    colorScheme={selectedChat.isRead ? "green" : "gray"}
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
                <HStack
                  key={msgIndex}
                  alignSelf={msg.isBot ? "flex-start" : "flex-end"}
                >
                  <Text
                    alignSelf={msg.isBot ? "flex-start" : "flex-end"}
                    bg={msg.isBot ? "gray.200" : "blue.200"}
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
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              w="100%"
              bg="gray.50"
            >
              <HStack justifyContent="space-between">
                <Text fontSize="lg" fontWeight="bold">
                  Chat Session {chat._id}
                </Text>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FaCheck />}
                    colorScheme={chat.isRead ? "green" : "gray"}
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
                <HStack
                  key={msgIndex}
                  alignSelf={msg.isBot ? "flex-start" : "flex-end"}
                >
                  <Text
                    alignSelf={msg.isBot ? "flex-start" : "flex-end"}
                    bg={msg.isBot ? "gray.200" : "blue.200"}
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
