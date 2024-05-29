import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Flex,
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
  Heading,
  Link,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from "@chakra-ui/react";
import { useHistory } from 'react-router-dom'; 
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [plotAreaValue, setPlotAreaValue] = useState('');
  const [plotAreaUnit, setPlotAreaUnit] = useState('yards');
  const [plotPrice, setPlotPrice] = useState('');
  const [plotLocation, setPlotLocation] = useState('');
  const [pics, setPics] = useState([]);
  const [highlights, setHighlights] = useState(['']); // Initialize with default empty string
  const [currentPostId, setCurrentPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPicLoading, setIsPicLoading] = useState(false);
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false); // Separate state for the modal
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.name) {
      window.alert('You need to log in');
      history.push('/login');
    } else {
      setUserName(userInfo.name);
      fetchPosts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const postData = { title, content, plotArea: { value: plotAreaValue, unit: plotAreaUnit }, plotPrice, plotLocation, pics, highlights };
    setIsLoading(true);
    try {
      let response;
      if (currentPostId) {
        response = await axios.put(`http://localhost:5000/api/posts/${currentPostId}`, postData);
      } else {
        response = await axios.post('http://localhost:5000/api/posts', postData);
      }
      clearForm();
      setIsLoading(false);
      alert(`Post ${currentPostId ? 'updated' : 'created'} successfully!`);
      const updatedPosts = currentPostId ? posts.map(post => post._id === currentPostId ? response.data : post) : [...posts, response.data];
      setPosts(updatedPosts);
      setModalOpen(false); // Close modal after success
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      alert('Failed to ' + (currentPostId ? 'update' : 'create') + ' post: ' + (error.response?.data?.error || error.message));
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
    setCurrentPostId(post._id);
    setModalOpen(true); // Open modal for editing
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

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    history.push('/login');
  };

  const NavLink = ({ to, onClose, children }) => (
    <Link
      as={RouterLink}
      to={to}
      fontWeight="bold"
      onClick={onClose}
      _hover={{ textDecoration: 'none' }}
      p={2}
    >
      {children}
    </Link>
  );

  return (
    <>
      <Box>
        <Flex
          as="header"
          bg="teal.500"
          color="white"
          padding="2"
          align="center"
          justify="space-between"
        >
          <Flex align="center">
            <Link
              as={RouterLink}
              to="/"
              fontWeight="bold"
              _hover={{ textDecoration: 'none' }}
            >
              <Flex align="center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Logo"
                  style={{ marginRight: '8px' }}
                />
                <Heading size="lg">Logo</Heading>
              </Flex>
            </Link>

            <Flex
              display={{ base: 'none', md: 'flex' }}
              flex="1"
              justify="flex-start"
              gap="10"
              ml="8"
            >
               <NavLink to="/" onClose={onDrawerClose}>
                Home
              </NavLink>
              <NavLink to="/profile" onClose={onDrawerClose}>
                Profile
              </NavLink>
            </Flex>
          </Flex>

          {/* Right section */}
          <Flex align="center">

            {/* Logout Link */}
            <Link
              as={RouterLink}
              to="/"
              fontWeight="bold"
              _hover={{ textDecoration: 'none' }}
              display={{ base: 'none', md: 'block' }}
              onClick={handleLogout}
            >
              Logout
            </Link>

            {/* Hamburger menu button for mobile */}
            <IconButton
              display={{ base: 'block', md: 'none' }}
              aria-label="Open Menu"
              icon={<HamburgerIcon />}
              onClick={onDrawerOpen}  // Use onDrawerOpen here
              ml="auto"
            />
          </Flex>

          {/* Drawer for mobile */}
          <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
            <DrawerOverlay />
            <DrawerContent bg="teal.500" color="white">
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <VStack align="start" spacing={4}>
                  <NavLink to="/" onClose={onDrawerClose}>
                    Home
                  </NavLink>
                  <NavLink to="/projects" onClose={onDrawerClose}>
                    Profile
                  </NavLink>
                  <Link
                    as={RouterLink}
                    to="/"
                    fontWeight="bold"
                    _hover={{ textDecoration: 'none' }}
                    display={{ base: 'none', md: 'block' }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Box>
      {/* Header End */}

      <Box marginX="auto" maxWidth="98%">
        <Box>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h2" size="xl" mb={4}>
              Dashboard
            </Heading>
            <div>
              {greeting}, {userName || "Guest"}
            </div>
          </Flex>
        </Box>

        <Flex justifyContent="flex-end">
          <Button onClick={() => setModalOpen(true)}>Post something..!</Button> {/* Use setModalOpen here */}
        </Flex>

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}> {/* Use isModalOpen here */}
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {currentPostId ? "Edit Post" : "Create Post"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Content:</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Plot Area Value:</label>
                  <input
                    type="number"
                    value={plotAreaValue}
                    onChange={(e) => setPlotAreaValue(e.target.value)}
                    required
                  />
                  <select
                    value={plotAreaUnit}
                    onChange={(e) => setPlotAreaUnit(e.target.value)}
                  >
                    <option value="yards">Yards</option>
                    <option value="meters">Meters</option>
                    <option value="acres">Acres</option>
                  </select>
                </div>
                <div>
                  <label>Plot Price:</label>
                  <input
                    type="number"
                    value={plotPrice}
                    onChange={(e) => setPlotPrice(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Plot Location:</label>
                  <input
                    type="text"
                    value={plotLocation}
                    onChange={(e) => setPlotLocation(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Pictures:</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => postDetails(e.target.files)}
                  />
                  {isPicLoading ? (
                    <div>Loading...</div>
                  ) : (
                    pics.map((pic, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img
                          src={pic}
                          alt={`Chosen ${index}`}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                        <Button
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                          }}
                          onClick={() => handleRemovePic(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))
                  )}
                </div>
                {/* Highlights section */}
                <div>
                  <label>Highlights:</label>
                  {highlights.map((highlight, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", marginBottom: "8px" }}
                    >
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => {
                          const updatedHighlights = [...highlights];
                          updatedHighlights[index] = e.target.value;
                          setHighlights(updatedHighlights);
                        }}
                        required
                      />
                      <Button onClick={() => handleRemoveHighlight(index)} ml={2}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button onClick={handleAddHighlight}>Add Highlight</Button>
                </div>
                {/* End of Highlights section */}
                <Button
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  isLoading={isLoading}
                  loadingText="Submitting..."
                >
                  {currentPostId ? "Update Post" : "Create Post"}
                </Button>
                {currentPostId && (
                  <Button variant="ghost" onClick={() => setModalOpen(false)}>
                    Cancel Edit
                  </Button>
                )}
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>

        {loadingPosts ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <>
            <h2>All Posts</h2>
            <ul>
              {posts.map((post) => (
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

                  <Box style={{ marginLeft: '20px' }}>
                    <Text fontWeight="bold">Highlights:</Text>
                    <UnorderedList>
                      {post.highlights.map((highlight, index) => (
                        <ListItem key={index}>{highlight}</ListItem>
                      ))}
                    </UnorderedList>
                  </Box>

                  <div>
                    {post.pics &&
                      post.pics.map((pic, index) => (
                        <div key={index} style={{ position: "relative" }}>
                          <img
                            src={pic}
                            alt={`Post ${index}`}
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        </div>
                      ))}
                  </div>

                  <Button onClick={() => startEdit(post)}>Edit</Button>
                  <Button onClick={() => deletePost(post)}>Delete</Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </Box>
    </>
  );
}

export default AdminPage;