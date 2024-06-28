import React from "react";
import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";

const Unique = () => {
  return (
    <Flex
      mt="100px"
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      width="100%"
      height={{ base: "auto", md: "500px" }}
      p={4}
      bg="white"
    >
      <Box
        width={{ base: "100%", md: "50%" }}
        height={{ base: "300px", md: "100%" }}
      >
        <Image
          src="Unique_lens.jpg"
          alt="Uniqness image"
          width="100%"
          height="100%"
          objectFit="fill"
        />
      </Box>

      <Box
        width={{ base: "100%", md: "50%" }}
        p={4}
        textAlign={{ base: "center", md: "left" }}
        display="flex"
        justifyContent="center"
      >
        <Box>
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

          <Box>
            <Text fontSize="lg" color="gray.600" mb={8}>
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                <li>Exceptional customer service</li>
                <li>Unparalleled market expertise</li>
                <li>Dedication to finding the perfect property</li>
                <li>
                  Experienced professionals staying ahead of market trends
                </li>
                <li>Innovative solutions and personalized service</li>
                <li>
                  Building lasting relationships grounded in trust, integrity,
                  and transparency
                </li>
              </ul>
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Unique;
