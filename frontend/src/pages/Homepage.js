import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Box,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Header from "../components/Miscellaneous/Header";
import Testt from "../components/Miscellaneous/Testt";
import Testt2 from "../components/Miscellaneous/Testt2";
import { FaHome, FaBuilding, FaIndustry, FaTractor } from "react-icons/fa";
import Footer from "../components/Miscellaneous/Footer";
import Main from "../components/Miscellaneous/Main";
import HomeProjects from "../components/Miscellaneous/HomeProject";
import HomeParallax from "../components/Miscellaneous/HomeParallax";
import WeOffer from "../components/Miscellaneous/WeOffer";

function Homepage() {
  const [allPosts, setAllPosts] = useState([]);
  const history = useHistory();

  const handleAdminLogin = () => {
    history.push("/login");
  };

  const handleTypeClick = (type) => {
    history.push(`/posts?type=${type}`);
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setAllPosts(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch posts:",
          error.response?.data?.error || error.message
        );
        alert("Failed to fetch posts");
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <>
      <div className="Homepage">
        {/* <Button onClick={handleAdminLogin}>Admin Login</Button> */}
        <Header />
        <Main />

        {/* Explore cards section */}
        <Box marginTop="150px" p={4} mx={{ base: 4, md: 8 }}>
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
            fontSize={["24px", "30px", "36px", "45px"]} // Responsive font sizes
            color="#000000CC"
            fontFamily="'Nunito Sans', Arial, sans-serif"
            textAlign="center"
            mb={6}
            data-aos="fade-right"
          >
            Explore Our Categories & Places
          </Text>

          <WeOffer />
          <Testt/>
          <Testt2/>

        </Box>
        {/* Explore cards section */}

        {/* our projects */}
        <HomeProjects />
        {/* our projects */}

        {/* parallax */}
        <HomeParallax />
        {/* parallax */}

        <Footer />
      </div>
    </>
  );
}

export default Homepage;
