import React from "react";
import { Box, Text, Flex, useBreakpointValue } from "@chakra-ui/react";
import Header from "../components/Miscellaneous/Header";
import Testt from "../components/Miscellaneous/Testt";
import Testt2 from "../components/Miscellaneous/Testt2";
import Footer from "../components/Miscellaneous/Footer";
import Main from "../components/Miscellaneous/Main";
import HomeParallax from "../components/Miscellaneous/HomeParallax";
import WeOffer from "../components/Miscellaneous/WeOffer";
import ContactForm from "../components/Miscellaneous/ContactForm";
import Map from "../components/Miscellaneous/Map";
import Testimonials from "../components/Miscellaneous/Testimonials";
import Unique from "../components/Miscellaneous/Unique";
import MV from "../components/Miscellaneous/MV";

function Homepage() {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });

  return (
    <>
      <div className="Homepage">
        <Header />
        <Main />

        {/* Explore cards section */}
        <Box id="categories" marginTop="150px" p={4} mx={{ base: 4, md: 8 }}>
          <Text
            fontSize="12.5px"
            color="#5ea51d"
            fontFamily="'Nunito Sans', Arial, sans-serif"
            textAlign="center"
            fontWeight="800"
          >
            RATNA CATEGORIES
          </Text>
          <Text
            fontSize={["24px", "30px", "36px", "45px"]}
            color="#000000CC"
            fontFamily="'Nunito Sans', Arial, sans-serif"
            textAlign="center"
            mb={6}
            data-aos="fade-right"
          >
            Explore Our Categories & Places
          </Text>

          <WeOffer />
          <Testt />   
          <Testt2 />
        </Box>
        {/* Explore cards section */}

        <Unique />
        <MV />


        {/* parallax */}
        <HomeParallax />
        {/* parallax */}

        <Testimonials />

        {/* Contact section */}
        <Text
          fontSize="12.5px"
          color="#5ea51d"
          fontFamily="'Nunito Sans', Arial, sans-serif"
          textAlign="center"
          fontWeight="800"
        >
          GET IN TOUCH
        </Text>
        <Text
          fontSize={["24px", "30px", "36px", "45px"]}
          color="#000000CC"
          fontFamily="'Nunito Sans', Arial, sans-serif"
          textAlign="center"
          mb={6}
          data-aos="fade-right"
        >
          Contact US
        </Text>
        <Flex
          direction={flexDirection}
          align="center"
          justify="center"
          gap={4}
          p={4}
        >
          <Box
            bg="white"
            boxShadow="md"
            borderRadius="md"
            p={4}
            width={{ base: "100%", md: "45%" }}
          >
            <ContactForm />
          </Box>
          <Box
            bg="white"
            boxShadow="md"
            borderRadius="md"
            p={4}
            width={{ base: "100%", md: "45%" }}
          >
            <Map />
          </Box>
        </Flex>
        {/* Contact section */}

        <Footer />
      </div>
    </>
  );
}

export default Homepage;
