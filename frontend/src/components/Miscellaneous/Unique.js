import React from 'react';
import { Box, Text, Flex, useBreakpointValue } from '@chakra-ui/react';

const Unique = () => {
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Flex
      direction={flexDirection}
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      align="center"
    >
      <Box flex="1" p={4}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign={{ base: 'center', md: 'left' }}
        >
          What makes us unique from others
        </Text>
      </Box>
      <Box flex="1" p={4}>
        <Text
          fontSize="lg"
          textAlign={{ base: 'center', md: 'left' }}
          color="gray.600"
        >
          At Ratna Real Estate, we pride ourselves on offering exceptional customer service, unparalleled market expertise, and a dedication to ensuring our clients find the perfect property to meet their needs. Our team of experienced professionals works tirelessly to stay ahead of market trends, providing innovative solutions and personalized service that sets us apart from the competition. We believe in building lasting relationships with our clients, grounded in trust, integrity, and transparency.
        </Text>
      </Box>
    </Flex>
  );
};

export default Unique;
