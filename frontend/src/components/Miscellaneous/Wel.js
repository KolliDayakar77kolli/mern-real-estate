import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Wel = () => {
  return (
    <Flex
    mt="130px"
    direction={{ base: 'column', md: 'row' }} 
    alignItems="center"
    justifyContent="center"
    width="100%"
    height="500px"
    p={4}
    bg="orange"
  >
    <Box
      width={{ base: '100%', md: '50%' }}
      height="100%" 
      p={4}
      textAlign={{ base: 'center', md: 'left' }} 
      display="flex"
      alignItems="center"
      justifyContent="center"
    bg="yellow"

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
      height="100%" 
      position="relative"
    bg="blue"

    >
      <Image
        src="Owner_Big_Photo.jpg"
        alt="owner pic"
        width="100%"
        height="100%"
        objectFit="fill" 
      />
    </Box>
  </Flex>
  );
};

export default Wel;
