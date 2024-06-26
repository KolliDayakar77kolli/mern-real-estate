import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Divider,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaCheck, FaTrash } from "react-icons/fa";
import axios from "axios";
import { io } from "socket.io-client";
import AdminHeader from "../components/Miscellaneous/AdminHeader";
import axiosInstance from '../axiosInstance.js';


const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const [socket, setSocket] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const chatsPerPage = 10;


  useEffect(() => {
     const newSocket = io(process.env.NODE_ENV === "production"
      ? "https://ratna-real-estate.onrender.com/"
      : "http://localhost:5000");

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

    async function fetchChats() {
      try {
        const response = await axiosInstance.get("/chats");
        setChats(response.data);

        const unreadChats = response.data.filter((chat) => !chat.isRead);
        setNotifications(unreadChats.length);

        const total = Math.ceil(response.data.length / chatsPerPage);
        setTotalPages(total);
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
        await axiosInstance.delete(`/chats/${chatId}`);
        setChats(chats.filter((chat) => chat._id !== chatId));

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
      await axiosInstance.put(`/chats/${chatId}/markAsRead`);
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

  const handleDeleteAllChats = async () => {
    if (
      deleteConfirmation.toLowerCase() === "ok delete" &&
      window.confirm("Are you sure you want to delete all chats?")
    ) {
      try {
        await axiosInstance.delete("/chats");
        setChats([]);
        setNotifications(0);
        toast({
          title: "All chats deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setDeleteConfirmation("");
      } catch (error) {
        console.error("Error deleting all chats:", error);
        toast({
          title: "Error deleting all chats",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Confirmation failed",
        description: "You need to type 'ok delete' to confirm",
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

  const indexOfLastChat = currentPage * chatsPerPage;
  const indexOfFirstChat = indexOfLastChat - chatsPerPage;
  const currentChats = chats.slice(indexOfFirstChat, indexOfLastChat);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            All Chats
          </Text>
          <Box flex="1" textAlign="center" mb={4}>
            <Button colorScheme="red" onClick={onOpen} isFullWidth>
              Delete All Chats
            </Button>
          </Box>
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
          {currentChats.length === 0 && (
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
          {currentChats.map((chat, index) => (
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Type 'ok delete' to confirm"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteAllChats}>
              Confirm Delete All Chats
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            onClick={() => paginate(currentPage - 1)}
            isDisabled={currentPage === 1}
            mr={2}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i + 1)}
              colorScheme={currentPage === i + 1 ? "blue" : "gray"}
              ml={2}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            onClick={() => paginate(currentPage + 1)}
            isDisabled={currentChats.length < chatsPerPage}
            ml={2}
          >
            Next
          </Button>
        </Box>
      )}
    </>
  );
};
          
          
export default AdminChat;