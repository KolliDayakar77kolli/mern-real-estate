import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

const Wel = () => {
  return (
    <Flex
      mt="130px"
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="500px"
      p={4}
    >
      <Box
        width={{ base: "100%", md: "50%" }}
        height="100%"
        p={4}
        textAlign={{ base: "center", md: "left" }}
        display="flex"
        justifyContent="center"
      >
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Welcome to Ratna Real Estate
          </Text>
          <Text mt={2}>
            Welcome to Ratna Real Estate, where expertise meets
            exceptional service. I’m Galla Srinivas Rao, the founder and principal
            broker of Ratna Real Estate. With over 10 years in
            the real estate industry, I have cultivated a reputation for
            excellence, integrity, and client-focused service. Our mission is to
            provide unparalleled real estate solutions tailored to each client’s
            unique needs and aspirations.
          </Text>
        </Box>
      </Box>

      <Box
        width={{ base: "100%", md: "50%" }}
        height="100%"
        position="relative"
      >
        <Image
          src="Owner_Big_Photo.jpg"
          alt="owner pic"
          width="100%"
          height="100%"
          objectFit="fill"
        />
      </Box>
    </Flex>
  );
};

export default Wel;
