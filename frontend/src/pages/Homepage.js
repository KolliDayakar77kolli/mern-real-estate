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

          {/* offer cards */}
          {/* <Box marginTop="40px" marginBottom="150px" display="flex" justifyContent="center" alignItems="center">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              <Card
                onClick={() => handleTypeClick("residential")}
                cursor="pointer"
                h="230px"
                w="230px"
                bg="#F3F5F1"
                _hover={{ bg: "#5ea51d", color: "#ffffff" }}
                className="group"
                data-aos="flip-right"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <CardBody
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }} // Apply hover color change here
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb="16px"
                  >
                    <FaHome size="40px" />
                  </Box>
                  <Text
                    as="h3"
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }}
                    fontSize="24px" // Enlarging the type name
                    textAlign="center" // Center align text
                  >
                    Residential
                  </Text>
                  <Text
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }}
                    textAlign="center" // Center align text
                  >
                    Click to view.
                  </Text>
                </CardBody>
              </Card>

              <Card
                onClick={() => handleTypeClick("commercial")}
                cursor="pointer"
                h="230px"
                w="230px"
                bg="#F3F5F1"
                _hover={{ bg: "#5ea51d", color: "#ffffff" }}
                className="group"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <CardBody
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }} // Apply hover color change here
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb="16px"
                  >
                    <FaBuilding size="40px" />
                  </Box>
                  <Text
                    as="h3"
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }}
                    fontSize="24px" // Enlarging the type name
                    textAlign="center" // Center align text
                  >
                    Commercial
                  </Text>
                  <Text
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }}
                    textAlign="center" // Center align text
                  >
                    Click to view.
                  </Text>
                </CardBody>
              </Card>

              <Card
                onClick={() => handleTypeClick("industrial")}
                cursor="pointer"
                h="230px"
                w="230px"
                bg="#F3F5F1"
                _hover={{ bg: "#5ea51d", color: "#ffffff" }}
                className="group"
                data-aos="flip-right"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <CardBody
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }} // Apply hover color change here
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb="16px"
                  >
                    <FaIndustry size="40px" />
                  </Box>
                  <Text
                    as="h3"
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }}
                    fontSize="24px" // Enlarging the type name
                    textAlign="center" // Center align text
                  >
                    Industrial
                  </Text>
                  <Text
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }}
                    textAlign="center" // Center align text
                  >
                    Click to view.
                  </Text>
                </CardBody>
              </Card>

              <Card
                onClick={() => handleTypeClick("agricultural")}
                cursor="pointer"
                h="230px"
                w="230px"
                bg="#F3F5F1"
                _hover={{ bg: "#5ea51d", color: "#ffffff" }}
                className="group"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <CardBody
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }} // Apply hover color change here
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb="16px"
                  >
                    <FaTractor size="40px" />
                  </Box>
                  <Text
                    as="h3"
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }}
                    fontSize="24px" // Enlarging the type name
                    textAlign="center" // Center align text
                  >
                    Agricultural
                  </Text>
                  <Text
                    color="#000000CC"
                    _groupHover={{ color: "#ffffff" }}
                    textAlign="center" // Center align text
                  >
                    Click to view.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box> */}
          {/* offer cards */}

        </Box>
        {/* Explore cards section */}

        {/* our projects */}
        <HomeProjects />
        {/* our projects */}

        {/* parallax */}
        <HomeParallax />
        {/* parallax */}

        {/* <Testt /> */}
        {/* <Testt2 /> */}

        {/* All posts */}
        {/* <Box bg="#F3F5F1">
          <h2>All Posts</h2>
          <ul>
            {allPosts.map((post) => (
              <li key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>
                  <strong>Plot Area:</strong> {post.plotArea.value}{" "}
                  {post.plotArea.unit}
                </p>
                <p>
                  <strong>Plot Price:</strong> {post.plotPrice}
                </p>
                <p>
                  <strong>Plot Location:</strong> {post.plotLocation}
                </p>
                {post.pics &&
                  post.pics.map((pic, index) => (
                    <img
                      key={index}
                      src={pic}
                      alt={`Post Pic ${index}`}
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  ))}
              </li>
            ))}
          </ul>
        </Box> */}
        {/* All posts */}

        <Footer />
      </div>
    </>
  );
}

export default Homepage;
