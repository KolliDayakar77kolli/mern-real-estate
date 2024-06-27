import React from "react";
import {
  Text,
  Flex,
  Image,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Unique = () => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const minHeight = useBreakpointValue({ base: "400px", md: "500px" });
  const maxHeight = useBreakpointValue({ base: "400px", md: "500px" });

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
      maxH={maxHeight}
    >
      {/* Left side with image */}
      <Flex
        flex="1"
        justify="center"
        align="center"
        p={1}
        minH={minHeight}
        maxH={maxHeight}
      >
        <Image
          src="Owner_Big_Photo.jpg"
          alt="Real Estate"
          w="100%"
          h="100%"
          objectFit="cover"
          borderRadius="md"
        />
      </Flex>

      {/* Right side with text and button */}
      <Flex
        flex="1"
        direction="column"
        p={8}
        minH={minHeight}
        maxH={maxHeight}
      >
        <Text
          fontSize="12.5px"
          color="#5ea51d"
          fontFamily="'Nunito Sans', Arial, sans-serif"
          fontWeight="800"
        >
          Our Special
        </Text>
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
              Building lasting relationships grounded in trust, integrity, and transparency
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
    </Flex>
  );
};

export default Unique;
