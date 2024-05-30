import React from 'react';
import { Box, Flex, Text, VStack, Stack, useBreakpointValue } from '@chakra-ui/react';

const Footer = () => {
  // Determine the direction of the Stack and text alignment based on the screen size
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const alignItems = useBreakpointValue({ base: 'flex-start', md: 'center' });

  return (
    <Flex w="100%" direction="column">
      <Box
        flex="0 0 85%"
        bg="#06112A"
        color="#FFFFFFB3"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Stack
          direction={stackDirection}
          spacing={8}
          w="100%"
          justify="center"
          alignItems={alignItems}
        >
          <VStack spacing={4} textAlign="center" alignItems={alignItems}>
            <Text>Column 1 Content</Text>
          </VStack>
          <VStack spacing={4} textAlign="center" alignItems={alignItems}>
            <Text>Column 2 Content</Text>
          </VStack>
          <VStack spacing={4} textAlign="center" alignItems={alignItems}>
            <Text>Column 3 Content</Text>
          </VStack>
        </Stack>
      </Box>
      <Box
        flex="0 0 15%"
        bg="#050D21"
        color="#FFFFFFB3"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Text>Side Content</Text>
      </Box>
    </Flex>
  );
};

export default Footer;
