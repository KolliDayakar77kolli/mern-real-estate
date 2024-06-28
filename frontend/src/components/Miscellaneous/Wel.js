import React from "react";
import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";

const Wel = () => {
  return (
    <Flex
      mt="100px"
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      width="100%"
      height={{ base: "auto", md: "500px" }}
      p={4}
    >
      <Box
        width={{ base: "100%", md: "50%" }}
        p={4}
        textAlign={{ base: "center", md: "left" }}
        display="flex"
        justifyContent="center"
      >
        <Box>
          <Text
            fontSize={{ base: "10px", md: "12.5px" }}
            color="#5ea51d"
            fontFamily="'Nunito Sans', Arial, sans-serif"
            fontWeight="800"
          >
            ABOUT US
          </Text>

          <Heading
            as="h1"
            size={{ base: "xl", md: "3xl" }}
            color="#081637"
            mb={8}
            fontFamily="'Nunito Sans', Arial, sans-serif"
          >
            Welcome to Ratna Real Estate
          </Heading>

          <Box>
            <Text
              as="span"
              fontSize={{ base: "1.5em", md: "2em" }}
              float="left"
              lineHeight="0.8"
              mr="0.1em"
              color="#081637"
              fontFamily="'Nunito Sans', Arial, sans-serif"
            >
              I’
            </Text>
            <Text
              as="span"
              mt={2}
              fontSize={{ base: "sm", md: "md" }}
              color="gray.600"
              lineHeight="taller"
              textAlign="justify"
            >
              m Galla Srinivas Rao, the founder and chairman of Ratna Real
              Estate. With over 10 years in the real estate industry, I have
              cultivated a reputation for excellence, integrity, and
              client-focused service. Our mission is to provide unparalleled
              real estate solutions tailored to each client’s unique needs and
              aspirations.
            </Text>
            <Text
              mt={2}
              fontSize={{ base: "sm", md: "md" }}
              color="gray.600"
              lineHeight="taller"
              textAlign="justify"
            >
              Whether you're a first-time buyer, an experienced investor, or
              looking to buy or sell your property, we have the knowledge and resources
              to assist you. Our deep understanding of the local market trends,
              combined with our extensive network, ensures that you get the best
              possible outcomes.
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        width={{ base: "100%", md: "50%" }}
        height={{ base: "300px", md: "100%" }}
        position="relative"
      >
        <Image
          src="Owner_Big_Photo.jpg"
          alt="owner pic"
          width="100%"
          height="100%"
          objectFit="fill"
        />
        <Box
          position="absolute"
          bottom={2}
          right={2}
          backgroundColor="rgba(0, 0, 0, 0.6)"
          color="white"
          borderRadius="md"
          p={2}
        >
          <Text fontWeight="bold">Galla Srinivas Rao</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Wel;