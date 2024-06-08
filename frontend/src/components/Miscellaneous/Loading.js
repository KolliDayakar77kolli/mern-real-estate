// src/components/Loading.js
import React from "react";
import { Flex, Spinner, Image } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      align="center"
      justify="center"
      backgroundColor="white"
      zIndex="9999"
    >
      <Flex direction="column" align="center" justify="center">
        <Image src="logo.png" alt="Logo" height="80px" boxSize="100px" mb={4}  width="80px" />
        <Spinner size="xl" />
      </Flex>
    </Flex>
  );
};

export default Loading;
