import React from "react";
import { Box, Text, ChakraProvider, Heading, Button, keyframes } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel CSS
import "./../../index.css";

const fadeRight = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const buttonSlideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const Main = () => {
  const images = [
    "https://source.unsplash.com/random/800x600?nature",
    "https://source.unsplash.com/random/800x601?nature",
    "https://source.unsplash.com/random/800x602?nature",
  ];

  return (
    <Box position="relative" top="55px" width="100%" minHeight="90vh">
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={3000}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            minHeight="90vh" // Min height of 90vh to ensure responsiveness
            backgroundImage={`url(${image})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            position="relative"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                maxWidth={{
                  base: "90%",
                  sm: "80%",
                  md: "70%",
                  lg: "800px",
                  xl: "800px",
                }}
                color="white"
                textAlign={{ base: "center", md: "left" }}
                p={{ base: "20px", md: "40px" }}
                m="auto"
                ml={{ base: "auto", md: "40px" }} // Add margin-left for larger screens
              >
                <Heading
                  as="h1"
                  fontSize={{
                    base: "24px",
                    sm: "28px",
                    md: "32px",
                    lg: "36px",
                    xl: "36px",
                  }}
                  mb="20px"
                  lineHeight="1.2"
                  animation={`${fadeRight} 1s ease-in-out`}
                >
                  Real Estate Development Company.
                  <br />
                  Near You.
                </Heading>
                <Text
                  fontSize={{
                    base: "16px",
                    sm: "18px",
                    md: "20px",
                    lg: "24px",
                  }}
                  mb="20px"
                  animation={`${fadeLeft} 1.5s ease-in-out`}
                >
                  Find your perfect property among our 5,000+ choices with the
                  help of our expert agents!
                </Text>
                <Button
                  bg="#5ea51d"
                  color="#ffffff"
                  padding={{ base: "10px 15px", md: "15px 20px" }}
                  fontSize={{ base: "14px", md: "18px" }}
                  onClick={() => alert("Explore our properties")}
                  animation={`${buttonSlideIn} 2s ease-in-out`}
                >
                  Explore our properties
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Main;
