import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Wel = () => {
  return (
    <Flex
    direction={{ base: 'column', md: 'row' }} // Stacks vertically on smaller screens, horizontally on larger screens
    alignItems="center"
    justifyContent="center"
    width="100%"
    height="500px" // Set a fixed height for the entire container
    p={4}
  >
    <Box
      width={{ base: '100%', md: '50%' }}
      height="100%" // Ensure the text box has the same height as the container
      p={4}
      textAlign={{ base: 'center', md: 'left' }} // Center text on smaller screens
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          Welcome to my page
        </Text>
        <Text mt={2}>
          This is a sample text to demonstrate the layout. You can add more content here.
        </Text>
      </Box>
    </Box>
    <Box
      width={{ base: '100%', md: '50%' }}
      height="100%" // Ensure the image box has the same height as the container
      position="relative"
    >
      <Image
        src="Owner_Big_Photo.jpg"
        alt="owner pic"
        width="100%"
        height="100%"
        objectFit="cover" // Ensure the image covers the entire box without being cut off
      />
    </Box>
  </Flex>
  );
};

export default Wel;
