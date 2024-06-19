import React from 'react';
import { Box, Text, Button, Flex, Spacer } from '@chakra-ui/react';

const HomeParallax = () => {
  return (
    <Box
      id="contact"
      marginBottom="50px"
      position="relative"
      height="50vh"
      backgroundImage="url('commercial_build.jpg')"
      backgroundAttachment="fixed"
      backgroundSize="cover"
      backgroundPosition="center"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgColor: 'rgba(0, 128, 0, 0.6)',
        // bgColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
      }}
    >
      <Flex
        height="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
        zIndex={2}
        color="white"
        textAlign="center"
        px={4}
      >
        <Flex
          width="100%"
          maxWidth="1000px"
          alignItems="center"
        >
          <Text fontSize={{ base: '2xl', md: '4xl' }} mb={{ base: 4, md: 0 }}
          >
            Find the Best Place for Living
          </Text>
          <Spacer />
          <Button
            bg="black"
            color="white"
            _hover={{ bg: 'gray.700' }}
          >
            Get in Touch
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HomeParallax;
