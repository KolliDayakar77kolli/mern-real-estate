import { Box, Flex, Heading, Image, Text, useBreakpointValue } from '@chakra-ui/react';

const Testt = () => {
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      // bgGradient="linear(to-tr, #00c6ff, #0072ff)"
      bg="white"

    >
      <Flex
        maxW="80%"
        p="6"
        boxShadow="xl"
        overflow="hidden"
        bg="white"
        alignItems="center"
        flexDirection={flexDirection}
        flexWrap="wrap"
      >
        <Box flex="1" p="4">
          <Heading as="h2" size="lg" mb="4" color="blue.700">
          Ready to Buy a property?
          </Heading>
          <Text fontSize="md" color="gray.600">
          Schedule a free property evaluation with our expert team. We will visit your property, provide you with a realistic market value, and explain our process. You can make an informed decision about working with us to sell your property.
          </Text>
        </Box>
        <Box
          flex="2"
          position="relative"
          height="100%"
          marginTop={{ base: '30px', md: '50px' }}
          marginBottom="30px"
          width="100%"
          overflow="hidden"
          boxShadow="2xl"
          clipPath="polygon(0 0, 100% 0%, 87% 100%, 20% 95%)"
          transformStyle="preserve-3d"
          transform={{
            base: 'perspective(800px) rotateX(-20deg)',
            md: 'perspective(1200px) rotateY(-20deg)',
          }}
        >
          <Image
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTE3OTM5My1pbWFnZS1rd3Z5MG94eC5qcGc.jpg"
            alt="Image"
            objectFit="cover"
            width="100%"
            height="400px"
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgGradient="linear(to-t, rgba(0,0,0,0.7), transparent)"
          />
          <Box
            position="absolute"
            bottom="4"
            left="4"
            right="4"
            color="white"
            zIndex="1"
            textAlign="center"
          >
            <Heading as="h3" size="md" mb="2">
              Beautiful Sunset
            </Heading>
            <Text fontSize="sm">
              Photo by John Doe
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Testt;