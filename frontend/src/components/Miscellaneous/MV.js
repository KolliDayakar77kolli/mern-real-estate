import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const MV = () => {
  return (
    <Flex 
      direction={['column', 'column', 'row']} 
      align="center" 
      justify="center" 
      w="100%" 
      p={4}
    >
      <Box 
        flex="1" 
        p={4} 
        m={2} 
        border="1px" 
        borderColor="gray.200" 
        borderRadius="md" 
        textAlign="center"
      >
        <Heading size="lg" mb={4}>Our Mission</Heading>
        <Text>
          Our mission is to empower individuals and organizations through innovative solutions and services that drive success and growth.
        </Text>
      </Box>

      <Box 
        flex="1" 
        p={4} 
        m={2} 
        border="1px" 
        borderColor="gray.200" 
        borderRadius="md" 
        textAlign="center"
      >
        <Heading size="lg" mb={4}>Our Vision</Heading>
        <Text>
          Our vision is to be a global leader in our industry, setting standards for excellence and integrity, and making a positive impact on society.
        </Text>
      </Box>

      <Box 
        flex="1" 
        p={4} 
        m={2} 
        border="1px" 
        borderColor="gray.200" 
        borderRadius="md" 
        textAlign="center"
      >
        <Heading size="lg" mb={4}>Our Values</Heading>
        <Text>
          Our values are integrity, innovation, and customer focus, guiding our actions and decisions in every aspect of our business.
        </Text>
      </Box>
    </Flex>
  );
}

export default MV;
