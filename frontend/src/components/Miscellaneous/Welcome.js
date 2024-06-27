import React from 'react';
import { Box, Text, Heading, Image, useBreakpointValue } from '@chakra-ui/react';

const Welcome = () => {
  const isVertical = useBreakpointValue({ base: true, md: false });

  return (
    <Box display="flex" flexDirection={isVertical ? 'column' : 'row'} height="100vh">
      <Box flex="1" p={8} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to Our Site
        </Heading>
        <Text fontSize="xl" textAlign="center">
          We're glad to have you here. Explore our site to learn more about what we offer. Feel free to reach out with any questions!
        </Text>
      </Box>
      <Box flex="1" overflow="hidden">
        <Image
          src="Owner_Big_Photo.jpg"
          alt="Welcome Image"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  );
};

export default Welcome;

