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
      mt="300px"
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
