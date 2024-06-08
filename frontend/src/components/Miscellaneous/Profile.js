import React from 'react';
import { Box, Avatar, Input, FormControl, FormLabel, VStack, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa';

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
            <Avatar
              boxSize="150px" // Custom size for the avatar
              name="Profile Name"
              src="https://i.pinimg.com/736x/a9/fe/fe/a9fefe0767b468591389c5d87eb581d0.jpg"
              position="absolute"
              bottom="-75px" // Adjusted to maintain the overlap effect
              right="60px" // Adjust this value to move avatar to the left
              border="4px solid white"
            />
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
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        // Update avatar source here
                        console.log(e.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Box>
            )}
          </Box>
        </Flex>
      </Box>

      {/* Bottom section with white background */}
      <Box bg="white" pt="90px" pb="20px"> {/* Adjusted top padding to accommodate larger avatar */}
        <Flex justifyContent="center">
          <Box w="400px">
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter your name" />
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input placeholder="Enter your age" type="number" />
              </FormControl>
              <FormControl>
                <FormLabel>Place</FormLabel>
                <Input placeholder="Enter your place" />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Enter your phone number" type="tel" />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter your email" type="email" />
              </FormControl>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;
