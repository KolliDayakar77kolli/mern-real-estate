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
      <Header />

      <div className="Homepage">
        {/* <Button onClick={handleAdminLogin}>Admin Login</Button> */}



        {/* Explore cards section */}
        <Box p={4} mx={{ base: 4, md: 8 }}>
          <Text
            fontSize="28px"
            color="#000000CC"
            fontFamily="'Nunito Sans', Arial, sans-serif"
            textAlign="center"
            mb={6}
          >
            Explore Our Categories & Places
          </Text>
          <Box display="flex" justifyContent="center" alignItems="center">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              <Card
                onClick={() => handleTypeClick("residential")}
                cursor="pointer"
                // border="1px solid #ccc"

                h="200px"
                w="200px"
                bg="#F3F5F1"
                _hover={{ bg: "#5ea51d", color: "#ffffff" }}
                className="group"
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
                  >
                    Residential
                  </Text>
                  <Text color="#000000CC" _groupHover={{ color: "#ffffff" }}>
                    Click to view all residential posts.
                  </Text>
                </CardBody>
              </Card>

              <Card
                onClick={() => handleTypeClick("commercial")}
                cursor="pointer"
                // border="1px solid #ccc"
                h="200px"
                w="200px"
                bg="#F3F5F1"
                _hover={{ bg: "#5ea51d", color: "#ffffff" }}
                className="group"
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
                  >
                    Commercial
                  </Text>
                  <Text color="#000000CC" _groupHover={{ color: "#ffffff" }}>
                    Click to view all commercial posts.
                  </Text>
                </CardBody>
              </Card>

              <Card
                onClick={() => handleTypeClick("industrial")}
                cursor="pointer"
                // border="1px solid #ccc"
                h="200px"
                w="200px"
                bg="#F3F5F1"
                _hover={{ bg: "#5ea51d", color: "#ffffff" }}
                className="group"
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
                  >
                    Industrial
                  </Text>
                  <Text color="#000000CC" _groupHover={{ color: "#ffffff" }}>
                    Click to view all industrial posts.
                  </Text>
                </CardBody>
              </Card>

              <Card
                onClick={() => handleTypeClick("agricultural")}
                cursor="pointer"
                // border="1px solid #ccc"
                h="200px"
                w="200px"
                bg="#F3F5F1"
                _hover={{ bg: "#5ea51d", color: "#ffffff" }}
                className="group"
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
                  >
                    Agricultural
                  </Text>
                  <Text color="#000000CC" _groupHover={{ color: "#ffffff" }}>
                    Click to view all agricultural posts.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>
        </Box>
        {/* Explore cards section */}



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



      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Homepage;
