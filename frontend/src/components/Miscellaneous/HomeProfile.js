import React from 'react';
import { Box, Flex, Text, Image, useBreakpointValue } from '@chakra-ui/react';

const HomeProfile = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box width="100%" borderRadius="md" boxShadow="lg" p={5}>
      <Flex bg="#F3F5F1" direction={isMobile ? 'column' : 'row'} align="center" justify="center">
        <Box flex="1"  textAlign={isMobile ? 'center' : 'left'} px={6} py={4}>
          <Text fontSize="2xl" fontWeight="bold" color="teal.500">Welcome to Our Real Estate Website</Text>
          <Text fontSize="lg" mt={2}>We're delighted to have you here.</Text>
          <Text fontSize="lg" mt={2}>His name: Galla</Text>
        </Box>
        <Box flex="1" mt={isMobile ? 4 : 0} textAlign="center" px={6} py={4}>
          <Image
            src="https://source.unsplash.com/random/800x1200?nature"
            alt="User Image"
            borderRadius="md"
            boxSize={isMobile ? "150px" : "200px"}
            border="4px solid teal"
            objectFit="cover"
            mx="auto"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeProfile;
