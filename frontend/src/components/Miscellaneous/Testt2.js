import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Link,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

const Testt = () => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Flex
      mt="50px"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      // bgGradient="linear(to-tr, #00c6ff, #0072ff)"
      // bg="white"
    >
      <Flex
        maxW="100%"
        p="6"
        boxShadow="xl"
        overflow="hidden"
        bg="white"
        alignItems="center"
        flexDirection={flexDirection}
        flexWrap="wrap"
      >
        <Box
          flex="2"
          position="relative"
          height="100%"
          marginTop={{ base: "30px", md: "50px" }}
          marginBottom="30px"
          width="100%"
          overflow="hidden"
          boxShadow="2xl"
          clipPath={{
            base:
              flexDirection === "column"
                ? "none"
                : "polygon(0 0, 100% 0%, 87% 100%, 20% 95%)",
            md: "polygon(0 0, 100% 0%, 87% 100%, 20% 95%)",
          }}
          transformStyle="preserve-3d"
          transform={{
            base:
              flexDirection === "column"
                ? "perspective(800px) rotateX(0deg)"
                : "perspective(800px) rotateX(-20deg)",
            md:
              flexDirection === "column"
                ? "perspective(1200px) rotateY(0deg)"
                : "perspective(1200px) rotateY(-20deg)",
          }}
        >
          <Image
            src="Buy_A_Property.jpg"
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
              "Explore top-tier properties"
            </Heading>
          </Box>
        </Box>

        <Box flex="1" p="4">
          <Heading as="h2" size="lg" mb="4" color="blue.700">
            Ready to buy a property?
          </Heading>
          <Text fontSize="md" color="gray.600" lineHeight="taller">
            Discover exceptional properties suited to your goals. Explore a
            premier selection of plots, lands, and commercial buildings with our
            expert guidance, ensuring a seamless and rewarding investment
            experience.
          </Text>

          <Box mt={8}>
            <Link mt={4} href="#categories" style={{ textDecoration: "none" }}>
              <Button
                bg="blue.700"
                color="white"
                _hover={{
                  bg: "white",
                  color: "blue.700",
                  border: "1px solid",
                  borderColor: "blue.700",
                }}
                _active={{ bg: "transparent" }}
                _focus={{ boxShadow: "xl" }}
                cursor="pointer"
                fontSize="lg"
              >
                Buy Now
              </Button>
            </Link>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Testt;
