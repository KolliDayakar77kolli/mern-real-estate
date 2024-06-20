import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Box,
  Text,
  UnorderedList,
  ListItem,
  VStack,
  Flex,
  Grid,
  Stack,
  Input,
  Image,
  Heading,
  Tag,
  Icon,
  ChakraProvider,
  useBreakpointValue

} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../App.css';
import PostsHeader from '../Miscellaneous/PostsHeader';
import ContactForm from "../Miscellaneous/ContactForm";
import Map from "../Miscellaneous/Map";
import Footer from "../Miscellaneous/Footer";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Posts() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const query = useQuery();
  const type = query.get('type');
  const itemsPerPage = 5; 
  const [currentPage, setCurrentPage] = useState(1);
  const [keyCounter, setKeyCounter] = useState(0); 
  const [selectedImageIndex, setSelectedImageIndex] = useState([]);
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  useEffect(() => {
    const fetchPosts = async () => {
      if (!type) {
        alert('No type specified');
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/posts/type?type=${type}`
        );
        setAllPosts(response.data);
        setFilteredPosts(response.data); 
        setSelectedImageIndex(new Array(response.data.length).fill(0));
      } catch (error) {
        console.error(
          'Failed to fetch posts:',
          error.response?.data?.error || error.message
        );
        alert('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, [type]);

  useEffect(() => {
    const filtered = allPosts.filter((post) =>
      post.plotLocation.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, allPosts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setKeyCounter(keyCounter + 1); 
  };

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  if (!type) {
    return <div>No type specified</div>;
  }

  return (
    <ChakraProvider>
      <PostsHeader />
      <Box paddingBottom="70px"></Box>
      <Box className="Posts" bg="#F3F5F1" color="black" p="20px">
        <Flex alignItems="center">
          <Text
            flex="1"
            textAlign="left"
            marginBottom="10px"
            fontSize="27px"
          >
            {type
              ? `${type.charAt(0).toUpperCase() + type.slice(1)} Posts`
              : "Posts"}
          </Text>
          <Box flex="1" ml="auto" textAlign="right" mt="10px">
            <Input
              marginTop="20px"
              placeholder="Search by location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              mb={10}
              w="100%"
              variant="filled"
              bg="white"
              _hover={{ bg: "#E2E8F0" }}
            />
          </Box>
        </Flex>

        <VStack spacing={4} align="center">
          {filteredPosts.length === 0 ? (
            <Text color="black" textAlign="center">
              No posts found
            </Text>
          ) : (
            filteredPosts
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((post, postIndex) => (
                <Flex
                data-aos="fade-right"
                  key={postIndex}
                  direction={{ base: "column", md: "row" }}
                  bg="#ffffff"
                  borderRadius="8px"
                  overflow="hidden"
                  w={{ base: "100%", md: "90%" }}
                  mx="auto"
                  mb={4}
                  position="relative"
                  maxH="auto"
                  boxShadow="0px 8px 16px rgba(0, 0, 0, 0.2)"
                >
                  <Box
                    flex={{ base: "100%", md: "50%" }}
                    overflow="hidden"
                    position="relative"
                    textAlign="center"
                    onClick={() => setSelectedImageIndex(prev => ({ ...prev, [postIndex]: 0 }))}
                  >
                    <Carousel
                      key={`carousel-${postIndex}`}
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop
                      selectedItem={selectedImageIndex[postIndex]}
                      interval={2000}
                    >
                      {post.pics &&
                        post.pics.map((pic, picIndex) => (
                          <Box
                            key={picIndex}
                            position="relative"
                            textAlign="center"
                            border={
                              picIndex === selectedImageIndex[postIndex]
                                ? "1px solid black"
                                : "none"
                            }
                            borderRadius="md"
                            overflow="hidden"
                            onClick={() => setSelectedImageIndex(prev => ({ ...prev, [postIndex]: picIndex }))}
                            width="100%"
                            height={{ base: "200px", md: "300px", lg: "380px" }}
                          >
                            <Image
                              src={pic}
                              alt={`Post Image ${picIndex}`}
                              objectFit="cover"
                              width="100%"
                              height="100%"
                            />
                          </Box>
                        ))}
                    </Carousel>
                  </Box>

                  <Box
                    flex={{ base: "100%", md: "40%" }}
                    color="black"
                    p={4}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    zIndex={2}
                    mt={{ base: 4, md: 0 }}
                  >
                    <Box>
                      <Heading
                        as="h3"
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.800"
                        textAlign="center"
                      >
                        {post.title}
                      </Heading>
                      <Box mt={2} textAlign="center">
                        <Tag colorScheme="orange">{post.content}</Tag>
                      </Box>

                      <Grid templateColumns="1fr 1fr" gap={6}>
                        <Box p={6} textAlign="left">
                          <Box mb={4}>
                            <Text>
                              <strong>Plot Area:</strong> {post.plotArea.value} {post.plotArea.unit}
                            </Text>
                          </Box>
                          <Box>
                            <Text>
                              <strong>Plot Price:</strong> {post.plotPrice}
                            </Text>
                          </Box>
                        </Box>
                        <Box p={6} textAlign="left">
                          <Box mb={4}>
                            <Text>
                              <strong>Plot Location:</strong> {post.plotLocation}
                            </Text>
                          </Box>
                          <Box>
                            <Text>
                              <strong>Plot Title:</strong> {post.title}
                            </Text>
                          </Box>
                        </Box>
                      </Grid>

                      <Box mt={2} mx={6} textAlign="center">
                        <Text fontWeight="bold" textAlign="start">
                          Highlights:
                        </Text>
                        <UnorderedList ml={4} listStylePosition="inside">
                          {post.highlights &&
                            post.highlights.map((highlight, highlightIndex) => (
                              <ListItem
                                key={highlightIndex}
                                display="flex"
                                alignItems="center"
                              >
                                <Box as="span" pr={2}>
                                  <Text as="span">&#8226;</Text>
                                </Box>
                                <Text as="span">{highlight}</Text>
                              </ListItem>
                            ))}
                        </UnorderedList>
                      </Box>
                    </Box>

                    <Box
                      mt={4}
                      textAlign="center"
                      display={{ base: "none", md: "flex" }}
                      justifyContent="space-between"
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Icon
                        as={FaChevronLeft}
                        onClick={() =>
                          setSelectedImageIndex(prev => ({
                            ...prev,
                            [postIndex]: (prev[postIndex] - 1 + post.pics.length) % post.pics.length
                          }))
                        }
                        boxSize={6}
                        cursor="pointer"
                        zIndex={1}
                        mx={2}
                        borderRadius="full"
                      />
                      <Box
                        mt={4}
                        textAlign="center"
                        display="flex"
                        justifyContent="center"
                        flexWrap="wrap"
                      >
                       
                       {post.pics &&
                          post.pics.map((pic, picIndex) => (
                            <Box
                              key={picIndex}
                              className="thumb"
                              width="70px"
                              height="70px"
                              borderRadius="50%"
                              overflow="hidden"
                              border="3px solid white"
                              mx="2px"
                              position="relative"
                              cursor="pointer"
                              onClick={() =>
                                setSelectedImageIndex(prev => ({
                                  ...prev,
                                  [postIndex]: picIndex
                                }))
                              }
                              style={{
                                border:
                                  picIndex === selectedImageIndex[postIndex]
                                    ? "3px solid black"
                                    : "3px solid white",
                                borderRadius:
                                  picIndex === selectedImageIndex[postIndex]
                                    ? "md"
                                    : "50%",
                              }}
                            >
                              <Box
                                width="100%"
                                height="100%"
                                borderRadius="50%"
                                overflow="hidden"
                                position="relative"
                              >
                                <Image
                                  src={pic}
                                  alt={`Thumbnail ${picIndex}`}
                                  objectFit="cover"
                                  width="100%"
                                  height="100%"
                                  style={{ borderRadius: "50%" }}
                                />
                              </Box>
                            </Box>
                          ))}
                      </Box>
                      <Icon
                        as={FaChevronRight}
                        onClick={() =>
                          setSelectedImageIndex(prev => ({
                            ...prev,
                            [postIndex]: (prev[postIndex] + 1) % post.pics.length
                          }))
                        }
                        boxSize={6}
                        cursor="pointer"
                        zIndex={1}
                        mx={2}
                        borderRadius="full"
                      />
                    </Box>

                    <Box
                      display={{ base: "flex", md: "none" }}
                      justifyContent="space-between"
                      alignItems="center"
                      mt={4}
                    >
                      <Icon
                        as={FaChevronLeft}
                        onClick={() =>
                          setSelectedImageIndex(prev => ({
                            ...prev,
                            [postIndex]: (prev[postIndex] - 1 + post.pics.length) % post.pics.length
                          }))
                        }
                        boxSize={6}
                        cursor="pointer"
                        zIndex={1}
                        borderRadius="full"
                      />
                      <Icon
                        as={FaChevronRight}
                        onClick={() =>
                          setSelectedImageIndex(prev => ({
                            ...prev,
                            [postIndex]: (prev[postIndex] + 1) % post.pics.length
                          }))
                        }
                        boxSize={6}
                        cursor="pointer"
                        zIndex={1}
                        borderRadius="full"
                      />
                    </Box>
                  </Box>
                </Flex>
              ))
          )}
        </VStack>

        <Stack direction="row" spacing={4} align="center" justify="center" mt={4}>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            leftIcon={<ChevronLeftIcon />}
            variant="outline"
            colorScheme="teal"
          >
            Previous
          </Button>
          {[...Array(totalPages).keys()].map((page) => (
            <Button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              variant={currentPage === page + 1 ? "solid" : "outline"}
              colorScheme={currentPage === page + 1 ? "teal" : "gray"}
            >
              {page + 1}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            rightIcon={<ChevronRightIcon />}
            variant="outline"
            colorScheme="teal"
          >
            Next
          </Button>
        </Stack>


        {/* contact section */}
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
        {/* contact section */}
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default Posts;