import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  UnorderedList,
  ListItem,
  Flex,
  Image,
  Container,
  Input,
  IconButton,

  FormControl, FormLabel,  Select, Textarea 
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import AdminHeader from '../components/Miscellaneous/AdminHeader'

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [plotAreaValue, setPlotAreaValue] = useState('');
  const [plotAreaUnit, setPlotAreaUnit] = useState('yards');
  const [plotPrice, setPlotPrice] = useState('');
  const [plotLocation, setPlotLocation] = useState('');
  const [pics, setPics] = useState([]);
  const [highlights, setHighlights] = useState(['']);
  const [type, setType] = useState('residential');
  const [currentPostId, setCurrentPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPicLoading, setIsPicLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; 
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.name) {
      window.alert('You need to log in');
      history.push('/login');
    } else {
      setUserName(userInfo.name);
      fetchPosts();
    }
  }, [history]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
    } else if (hour >= 18 && hour < 24) {
      setGreeting('Good evening');
    } else {
      setGreeting('Good night');
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
      setLoadingPosts(false);
    } catch (error) {
      console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
      alert('Failed to fetch posts');
      setLoadingPosts(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      plotArea: { value: plotAreaValue, unit: plotAreaUnit },
      plotPrice,
      plotLocation,
      pics,
      highlights,
      type,
    };
    setIsLoading(true);
    try {
      let response;
      if (currentPostId) {
        response = await axios.put(
          `http://localhost:5000/api/posts/${currentPostId}`,
          postData
        );
      } else {
        response = await axios.post('http://localhost:5000/api/posts', postData);
      }
      clearForm();
      setIsLoading(false);
      alert(
        `Post ${
          currentPostId ? 'updated' : 'created'
        } successfully!`
      );
      const updatedPosts = currentPostId
        ? posts.map((post) =>
            post._id === currentPostId ? response.data : post
          )
        : [...posts, response.data];
      setPosts(updatedPosts);
      onClose();
      setCurrentPostId(null); 
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      alert(
        'Failed to ' +
          (currentPostId ? 'update' : 'create') +
          ' post: ' +
          (error.response?.data?.error || error.message)
      );
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setPlotAreaValue('');
    setPlotAreaUnit('yards');
    setPlotPrice('');
    setPlotLocation('');
    setPics([]);
    setHighlights(['']);
    setType('Amaravathi');
    setCurrentPostId(null);
  };

  const handleAddHighlight = () => {
    setHighlights([...highlights, '']);
  };

  const handleRemoveHighlight = (index) => {
    const updatedHighlights = highlights.filter((_, i) => i !== index);
    setHighlights(updatedHighlights);
  };

  const startEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setPlotAreaValue(post.plotArea.value);
    setPlotAreaUnit(post.plotArea.unit);
    setPlotPrice(post.plotPrice);
    setPlotLocation(post.plotLocation);
    setPics(post.pics);
    setHighlights(post.highlights || ['']);
    setType(post.type);
    setCurrentPostId(post._id);
    onOpen();
  };

  const deletePost = async (post) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
      const updatedPosts = posts.filter(p => p._id !== post._id);
      setPosts(updatedPosts);
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Failed to delete post:', error.response?.data?.error || error.message);
      alert('Failed to delete post: ' + (error.response?.data?.error || error.message));
    }
  };

  const postDetails = async (files) => {
    try {
      setIsPicLoading(true);
      const promises = Array.from(files).map(file => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'real-estate');
        data.append('cloud_name', 'dtsi0uvsr');
        return fetch('https://api.cloudinary.com/v1_1/dtsi0uvsr/image/upload', {
          method: 'POST',
          body: data,
        });
      });

      const responses = await Promise.all(promises);
      const responseData = await Promise.all(responses.map(response => response.json()));
      const imageUrls = responseData.map(data => data.url);
      setPics([...pics, ...imageUrls]);
      setIsPicLoading(false);
    } catch (error) {
      console.error('Error uploading pictures:', error);
      alert('Error uploading pictures');
      setIsPicLoading(false);
    }
  };

  const handleRemovePic = (index) => {
    const updatedPics = pics.filter((_, i) => i !== index);
    setPics(updatedPics);
  };

  // const gotoHome = () => {
  //   history.push("/");
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('userInfo');
  //   history.push('/login');
  // };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredPosts = posts.filter(post => 
    post.plotLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
    <AdminHeader />
    <Box 
     display='flex'
     justifyContent='space-between'
     alignItems='center'
     px={4}
     mt={4}
    >
      <div>
        {greeting}, {userName || "Guest"}
      </div>
      <Button onClick={onOpen} colorScheme='blue'>Post something..!</Button>
    </Box>
      <Modal isOpen={isOpen} onClose={() => { onClose(); clearForm(); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentPostId ? "Edit Post" : "Create Post"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>

              <form onSubmit={handleSubmit}>
                    <FormControl mb={4}>
                      <FormLabel>Title:</FormLabel>
                      <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </FormControl>
                    
                    <FormControl mb={4}>
                      <FormLabel>Content:</FormLabel>
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      />
                    </FormControl>
                    
                    <FormControl mb={4}>
                      <FormLabel>Plot Area:</FormLabel>
                      <Flex>
                        <Input
                          type="number"
                          value={plotAreaValue}
                          onChange={(e) => setPlotAreaValue(e.target.value)}
                          required
                          mr={2}
                        />
                        <Select
                          value={plotAreaUnit}
                          onChange={(e) => setPlotAreaUnit(e.target.value)}
                        >
                          <option value="yards">yards</option>
                          <option value="Acres">Acres</option>
                          <option value="Cents">Cents</option>
                          <option value="Sqft">Sqft</option>
                        </Select>
                      </Flex>
                    </FormControl>
                    
                    <FormControl mb={4}>
                      <FormLabel>Plot Price:</FormLabel>
                      <Input
                        type="number"
                        value={plotPrice}
                        onChange={(e) => setPlotPrice(e.target.value)}
                        required
                      />
                    </FormControl>
                    
                    <FormControl mb={4}>
                      <FormLabel>Plot Location:</FormLabel>
                      <Input
                        type="text"
                        value={plotLocation}
                        onChange={(e) => setPlotLocation(e.target.value)}
                        required
                      />
                    </FormControl>
                    
                    <FormControl mb={4}>
                      <FormLabel>Pictures:</FormLabel>
                      <Input
                        type="file"
                        multiple
                        onChange={(e) => postDetails(e.target.files)}
                      />
                      {isPicLoading && <div>Uploading pictures...</div>}
                      <Flex wrap="wrap">
                        {pics.map((pic, index) => (
                          <Flex key={index} direction="column" align="center" mb={2} mr={2}>
                            <img src={pic} alt="Uploaded" width="100" />
                            <Button colorScheme="red" size="sm" mt={2} onClick={() => handleRemovePic(index)}>Remove</Button>
                          </Flex>
                        ))}
                      </Flex>
                    </FormControl>
                    
                    <FormControl mb={4}>
                      <FormLabel>Highlights:</FormLabel>
                      {highlights.map((highlight, index) => (
                        <Flex key={index} mb={2}>
                          <Input
                            type="text"
                            value={highlight}
                            onChange={(e) =>
                              setHighlights(
                                highlights.map((h, i) =>
                                  i === index ? e.target.value : h
                                )
                              )
                            }
                            mr={2}
                          />
                          {index > 0 && (
                            <Button colorScheme="red" size="sm" onClick={() => handleRemoveHighlight(index)}>Remove</Button>
                          )}
                        </Flex>
                      ))}
                      <Button colorScheme="blue" size="sm" onClick={handleAddHighlight}>Add Highlight</Button>
                    </FormControl>
                    
                    <FormControl mb={4}>
                      <FormLabel>Type:</FormLabel>
                      <Select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Amaravathi">Amaravathi</option>
                        <option value="Andhra">Andhra</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Commercial">Commercial</option>
                      </Select>
                    </FormControl>
                    
                    <Flex justify="space-between" mt={4}>
                      <Button colorScheme="green" type="submit" isLoading={isLoading}>
                        {currentPostId ? "Update" : "Submit"}
                      </Button>
                      <Button colorScheme="gray" onClick={() => { onClose(); clearForm(); setCurrentPostId(null); }}>
                        Cancel
                      </Button>
                    </Flex>
              </form>
  
            </ModalBody>
          </ModalContent>
        </Modal>
  
        <Box mt={8}>
          <Flex justify="space-between" align="center" mb={8} px={8} width="100%">
            <Text fontSize="2xl" fontWeight="bold" flex="1">
              All Posts
            </Text>
            <Input
              placeholder="Search by location"
              value={searchTerm}
              onChange={handleSearchChange}
              width={{ base: "100%", md: "auto" }}
              maxWidth="300px"
              flex="1"
              ml={{ base: 0, md: 4 }}
            />
          </Flex>
  
          {loadingPosts ? (
            <div>Loading posts...</div>
          ) : currentPosts.length === 0 ? (
            <div>No posts available</div>
          ) : (
            <Container maxW="container.xl" centerContent>
              <Flex
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                gap={6}
              >
                {currentPosts.map((post) => (
                  <Box
                    key={post._id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    mb={4}
                    flexBasis={{ base: "90%", md: "50%" }}
                    position="relative"
                    height="auto"
                    maxW={{ base: "90%", md: "48%" }}
                    width={{ base: "90%", md: "48%" }}
                  >
                    <Flex
                      direction={{ base: "column", md: "row" }}
                      gap={4}
                      height="100%"
                    >
                      <Box
                        flexBasis={{ base: "100%", md: "50%" }}
                        position="relative"
                        overflow="hidden"
                        borderRadius="lg"
                        height="auto"
                      >
                        <Carousel
                          renderArrow={({ type, onClick }) => (
                            <IconButton
                              aria-label={type === "prev" ? "Previous" : "Next"}
                              icon={
                                type === "prev" ? (
                                  <ChevronLeftIcon />
                                ) : (
                                  <ChevronRightIcon />
                                )
                              }
                              onClick={onClick}
                              position="absolute"
                              top="50%"
                              transform="translateY(-50%)"
                              zIndex="1"
                              bgColor="rgba(0, 0, 0, 0.4)"
                              color="white"
                              _hover={{ bgColor: "rgba(0, 0, 0, 0.6)" }}
                              size="sm"
                              left={type === "prev" ? "4px" : "auto"}
                              right={type === "next" ? "4px" : "auto"}
                            />
                          )}
                        >
                          {post.pics.map((pic, index) => (
                            <div key={index} >
                              <Image
                                src={pic}
                                alt={`Post picture ${index + 1}`}
                                objectFit="cover"
                                p={4}
                              />
                            </div>
                          ))}
                        </Carousel>
                      </Box>
  
                      <Box
                        flexBasis={{ base: "100%", md: "50%" }}
                        alignItems="center"
                        textAlign="center"
                        p={8}
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                      >
                        <Box>
                          <Text fontSize="xl" fontWeight="bold" mb={2}>
                            {post.title}
                          </Text>
                          <Text mb={2}>Location: {post.plotLocation}</Text>
                          <Text mb={2}>
                            Area: {post.plotArea.value} {post.plotArea.unit}
                          </Text>
                          <Text mb={2}>Price: {post.plotPrice}</Text>
                          <UnorderedList
                            mb={2}
                            style={{
                              textAlign: "left",
                              marginLeft: "auto",
                              marginRight: "auto",
                              width: "fit-content",
                            }}
                          >
                            {post.highlights.map((highlight, index) => (
                              <ListItem
                                key={index}
                                style={{
                                  textAlign: "center",
                                  listStylePosition: "inside",
                                }}
                              >
                                {highlight}
                              </ListItem>
                            ))}
                          </UnorderedList>
                          <Text mb={2}>Type: {post.type}</Text>
                        </Box>
                        <Box>
                          <Flex justifyContent="center">
                            <Button onClick={() => startEdit(post)} mr={2}>
                              Edit
                            </Button>
                            <Button onClick={() => deletePost(post)}>Delete</Button>
                          </Flex>
                        </Box>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </Container>
          )}
          <Flex justify="center" mt={4}>
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            {Array.from({
              length: Math.ceil(filteredPosts.length / postsPerPage),
            }).map((_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(filteredPosts.length / postsPerPage)
              }
            >
              Next
            </Button>
          </Flex>
        </Box>
      </>
    );
  };
  
  export default AdminPage;