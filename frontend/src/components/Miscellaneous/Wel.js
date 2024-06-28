import React from "react";
import { Box, Flex, Image, Heading,Text } from "@chakra-ui/react";

const Wel = () => {
  return (
    <Flex
      mt="100px"
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
          <Heading
            as="h1"
            size="4xl"
            color="#5ea51d"
            mb={4}
            fontFamily="'Nunito Sans', Arial, sans-serif"
          >
            Welcome to Ratna Real Estate
          </Heading>
          <Text
            fontSize="12.5px"
            color="#5ea51d"
            fontFamily="'Nunito Sans', Arial, sans-serif"
            textAlign="center"
            fontWeight="800"
          >
            Welcome to Ratna Real Estate, where expertise meets exceptional
            service.
          </Text>

          <Box>
            <Text
              as="span"
              fontSize="4em"
              float="left"
              lineHeight="0.8"
              mr="0.1em"
              color="#081637"
              fontFamily="'Nunito Sans', Arial, sans-serif"
            >
              I’
            </Text>
            <Text as="span"  mt={2} fontSize="md" color="gray.600" lineHeight="taller">
              I’m Galla Srinivas Rao, the founder and principal broker of Ratna
              Real Estate. With over 10 years in the real estate industry, I have
              cultivated a reputation for excellence, integrity, and
              client-focused service. Our mission is to provide unparalleled real
              estate solutions tailored to each client’s unique needs and
              aspirations.
            </Text>
          </Box>
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
