import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Wel = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }} // Stacks vertically on smaller screens, horizontally on larger screens
      alignItems="center"
      justifyContent="center"
      width="100%"
      p={4}
    >
      <Box
        width={{ base: '100%', md: '50%' }}
        p={4}
        textAlign={{ base: 'center', md: 'left' }} // Center text on smaller screens
      >
        <Text fontSize="xl" fontWeight="bold">
          Welcome to my page
        </Text>
        <Text mt={2}>
          This is a sample text to demonstrate the layout. You can add more content here.
        </Text>
      </Box>
      <Box
        position="relative"
        width={{ base: '100%', md: '50%' }}
        height="0"
        paddingBottom={{ base: '56.25%', md: '0' }} // Adjust aspect ratio only on smaller screens
        overflow="hidden"
        mb={{ base: 4, md: 0 }} // Margin bottom on smaller screens
      >
        <Image
          src="Owner_Big_Photo.jpg"
          alt="owner pic"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>
    </Flex>
  );
};

export default Wel;
