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
    // Retrieve user information from local storage
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
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with your authentication token
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
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'real-estate'); // Replace with your upload preset name
        formData.append('cloud_name', 'dtsi0uvsr'); // Replace with your cloud name
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dtsi0uvsr/image/upload', // Replace with your Cloudinary API URL
          {
            method: 'POST',
            body: formData,
          }
        );
  
        if (!response.ok) {
          throw new Error('Image upload failed!');
        }
  
        const data = await response.json();
  
        // Update user profile picture URL in state and local storage
        const newUserInfo = { ...userInfo, pic: data.secure_url };
        setUserInfo(newUserInfo);
        localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  
        // Update profile picture in the database
        await updateProfilePicture(userInfo._id, data.secure_url);
  
        // Show success message
        toast({
          title: 'Profile Picture Updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        // Handle error
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
        {/* Top section with background image */}
        <Box
          bgImage="url('https://i.pinimg.com/736x/a9/fe/fe/a9fefe0767b468591389c5d87eb581d0.jpg')"
          bgSize="cover"
          bgPosition="center"
          height="300px"
          position="relative"
        >
          <Flex justifyContent="flex-end" position="relative" height="100%">
            {/* Circular profile image with hover effect */}
            <Box
              position="relative"
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              _hover={{ cursor: 'pointer' }}
            >
              {userInfo && (
                <Avatar
                  boxSize="150px" // Custom size for the avatar
                  name={userInfo.name}
                  src={userInfo.pic} // Use the user's profile picture URL
                  position="absolute"
                  bottom="-75px" // Adjusted to maintain the overlap effect
                  right="60px" // Adjust this value to move avatar to the left
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










// import React from 'react';
// import { Box, Avatar, Input, FormControl, FormLabel, VStack, Flex, Icon, useDisclosure } from '@chakra-ui/react';
// import { FaCamera } from 'react-icons/fa';
// import AdminHeader from './AdminHeader';

// const Profile = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <>
//     <AdminHeader/>
//     <Box>
//       {/* Top section with background image */}
//       <Box
//         bgImage="url('https://i.pinimg.com/736x/a9/fe/fe/a9fefe0767b468591389c5d87eb581d0.jpg')"
//         bgSize="cover"
//         bgPosition="center"
//         height="300px"
//         position="relative"
//       >
//         <Flex justifyContent="flex-end" position="relative" height="100%">
//           {/* Circular profile image with hover effect */}
//           <Box
//             position="relative"
//             onMouseEnter={onOpen}
//             onMouseLeave={onClose}
//             _hover={{ cursor: 'pointer' }}
//           >
//             <Avatar
//               boxSize="150px" // Custom size for the avatar
//               name="Profile Name"
//               src="logged in user pic"
//               position="absolute"
//               bottom="-75px" // Adjusted to maintain the overlap effect
//               right="60px" // Adjust this value to move avatar to the left
//               border="4px solid white"
//             />
//             {isOpen && (
//               <Box
//                 position="absolute"
//                 bottom="-75px"
//                 right="60px"
//                 boxSize="150px"
//                 bg="blackAlpha.600"
//                 borderRadius="full"
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//               >
//                 <Icon as={FaCamera} color="white" boxSize="6" />
//                 <Input
//                   type="file"
//                   position="absolute"
//                   opacity="0"
//                   cursor="pointer"
//                   boxSize="150px"
//                   borderRadius="full"
//                   onChange={(event) => {
//                     const file = event.target.files[0];
//                     if (file) {
//                       const reader = new FileReader();
//                       reader.onload = (e) => {
//                         // Update avatar source here
//                         console.log(e.target.result);
//                       };
//                       reader.readAsDataURL(file);
//                     }
//                   }}
//                 />
//               </Box>
//             )}
//           </Box>
//         </Flex>
//       </Box>
//     </Box>
//     </>
//   );
// };

// export default Profile;
