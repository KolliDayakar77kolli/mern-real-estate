import React from "react";
import {
  Text,
  Flex,
  Image,
  Button,
  Box,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const minHeight = useBreakpointValue({ base: "300px", md: "300px" });

  return (
    <Flex
      direction={flexDirection}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      align="center"
      overflow="hidden"
      minH={minHeight}
    >
      <Flex flex="1" direction="column" p={8} minH={minHeight}>
        <Heading as="h1" size="2xl" color="#5ea51d" mb={4} fontFamily="'Nunito Sans', Arial, sans-serif" >
          Welcome to Our Site
        </Heading>
    
        <Text
          fontSize={["16px", "24px", "30px", "36px"]}
          color="#000000CC"
          fontFamily="'Nunito Sans', Arial, sans-serif"
          mb={6}
        >
          What makes us unique from others
        </Text>
        <Text fontSize="lg" color="gray.600" mb={8}>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>Exceptional customer service</li>
            <li>Unparalleled market expertise</li>
            <li>Dedication to finding the perfect property</li>
            <li>Experienced professionals staying ahead of market trends</li>
            <li>Innovative solutions and personalized service</li>
            <li>
              Building lasting relationships grounded in trust, integrity, and
              transparency
            </li>
          </ul>
        </Text>
        <Button
          as={Link}
          to="/about"
          bg="#5ea51d"
          size="md"
          mt="auto"
          width="200px"
        >
          Read more
        </Button>
      </Flex>

      <Flex
        flex="1"
        justify="center"
        align="center"
        p={1}
        minH={minHeight}
        position="relative"
      >
        <Image
          src="Owner_Big_Photo.jpg"
          alt="Real Estate"
          w="100%"
          h="100%"
          objectFit="cover"
          borderRadius="md"
        />
        <Box
          position="absolute"
          bottom={2}
          right={2}
          bg="rgba(0, 0, 0, 0.6)"
          color="white"
          p={2}
          borderRadius="md"
        >
          <Text fontSize="lg" fontWeight="bold">
            Galla Srinivas Rao
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Welcome;
