import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Input,
  Flex,
  Icon,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa';
import AdminHeader from './AdminHeader';

const Profile = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData) {
      setUserInfo(userData);
    }
  }, []);

  const updateProfilePicture = async (userId, imageUrl) => {
    try {
      const response = await fetch('http://localhost:3000/api/updateProfilePicture', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify({ pic: imageUrl }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile picture');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating profile picture:', error.message);
      throw error;
    }
  };
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'real-estate'); 
        formData.append('cloud_name', 'dtsi0uvsr'); 
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dtsi0uvsr/image/upload', 
          {
            method: 'POST',
            body: formData,
          }
        );
  
        if (!response.ok) {
          throw new Error('Image upload failed!');
        }
  
        const data = await response.json();
  
        const newUserInfo = { ...userInfo, pic: data.secure_url };
        setUserInfo(newUserInfo);
        localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  
        await updateProfilePicture(userInfo._id, data.secure_url);
  
        toast({
          title: 'Profile Picture Updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error updating profile picture:', error.message);
        toast({
          title: 'Error',
          description: 'Failed to update profile picture.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  

  return (
    <>
      <AdminHeader />
      <Box>
        <Box
          bgImage="url('https://i.pinimg.com/736x/a9/fe/fe/a9fefe0767b468591389c5d87eb581d0.jpg')"
          bgSize="cover"
          bgPosition="center"
          height="300px"
          position="relative"
        >
          <Flex justifyContent="flex-end" position="relative" height="100%">
            <Box
              position="relative"
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              _hover={{ cursor: 'pointer' }}
            >
              {userInfo && (
                <Avatar
                  boxSize="150px" 
                  name={userInfo.name}
                  src={userInfo.pic} 
                  position="absolute"
                  bottom="-75px" 
                  right="60px" 
                  border="4px solid white"
                />
              )}
              {isOpen && (
                <Box
                  position="absolute"
                  bottom="-75px"
                  right="60px"
                  boxSize="150px"
                  bg="blackAlpha.600"
                  borderRadius="full"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon as={FaCamera} color="white" boxSize="6" />
                  <Input
                    type="file"
                    position="absolute"
                    opacity="0"
                    cursor="pointer"
                    boxSize="150px"
                    borderRadius="full"
                    onChange={handleFileChange}
                  />
                </Box>
              )}
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Profile;