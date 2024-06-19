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

  return (
    <Flex
      direction={flexDirection}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      align="center"
    >
      {/* Left side with image */}
      <Flex
        flex="1"
        justify={{ base: "center", md: "center" }}
        align="center"
        p={1}
      >
        <Image
          src="Owner_Big_Photo.jpg"
          alt="Real Estate"
          // boxSize="400px"
          w="100%"
          h="400px"
          objectFit="cover"
          borderRadius="md"
        />
      </Flex>

      {/* Right side with text and button */}
      <Flex flex="1" direction="column" p={8}>
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
        <Text ml={6} fontSize="lg" color="gray.600" mb={8} listStyleType="disc">
          <ul>
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