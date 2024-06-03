// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory, useLocation } from 'react-router-dom';
// import { Button, Box, Text, UnorderedList, ListItem } from '@chakra-ui/react';
// import Residential from './Residential'  

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// function Posts() {
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const history = useHistory();
//   const query = useQuery();
//   const type = query.get('type');

//   useEffect(() => {
//     const fetchFilteredPosts = async () => {
//       if (!type) {
//         alert('No type specified');
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/posts/type?type=${type}`);
//         setFilteredPosts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
//         alert('Failed to fetch posts');
//       }
//     };

//     fetchFilteredPosts();
//   }, [type]);

//   const handleAdminLogin = () => {
//     history.push('/login');
//   };

//   return (
//     <div className="Posts">
//       <Residential />
//       <Button onClick={handleAdminLogin}>Admin Login</Button>
//       <h2>{type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Posts` : 'Posts'}</h2>
//       <ul>
//         {filteredPosts.map(post => (
//           <li key={post._id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <p><strong>Plot Area:</strong> {post.plotArea.value} {post.plotArea.unit}</p>
//             <p><strong>Plot Price:</strong> {post.plotPrice}</p>
//             <p><strong>Plot Location:</strong> {post.plotLocation}</p>
//             <Box style={{ marginLeft: '20px' }}>
//               <Text fontWeight="bold">Highlights:</Text>
//               <UnorderedList>
//                 {post.highlights.map((highlight, index) => (
//                   <ListItem key={index}>{highlight}</ListItem>
//                 ))}
//               </UnorderedList>
//             </Box>
//             {post.pics && post.pics.map((pic, index) => (
//               <img key={index} src={pic} alt={`Post Pic ${index}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
//             ))}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Posts;







// working without carousal

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory, useLocation } from 'react-router-dom';
// import { Button, Box, Text, UnorderedList, ListItem, VStack, Flex, Image, Stack } from '@chakra-ui/react';
// import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// function Posts() {
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const history = useHistory();
//   const query = useQuery();
//   const type = query.get('type');
//   const itemsPerPage = 2;
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchFilteredPosts = async () => {
//       if (!type) {
//         alert('No type specified');
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/posts/type?type=${type}`);
//         setFilteredPosts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
//         alert('Failed to fetch posts');
//       }
//     };

//     fetchFilteredPosts();
//   }, [type]);

//   const handleAdminLogin = () => {
//     history.push('/login');
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

//   const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

//   if (!type) {
//     return <div>No type specified</div>;
//   }

//   return (
//     <div className="Posts">
//       <Button onClick={handleAdminLogin}>Admin Login</Button>
//       <h2>{type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Posts` : 'Posts'}</h2>
//       <VStack spacing={4} align="stretch">
//         {paginatedData.map((post, index) => (
//           <Flex
//             key={index}
//             direction={{ base: 'column', md: 'row' }}
//             border="1px solid"
//             borderColor="gray.200"
//             borderRadius="md"
//             overflow="hidden"
//             w="100%"
//             h={{ base: 'auto', md: '300px' }}
//           >
//             <Box flex={{ base: '0 0 auto', md: '0 0 50%' }} h={{ base: '200px', md: '100%' }}>
//               <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
//                 {post.pics && post.pics.map((pic, picIndex) => (
//                   <Image key={picIndex} src={pic} objectFit="cover" h="100%" w="100%" />
//                 ))}
//               </Carousel>
//             </Box>
//             <Box flex={{ base: '0 0 auto', md: '0 0 50%' }} p={4} display="flex" flexDirection="column" justifyContent="space-between">
//               <Box>
//                 <Text fontSize="lg" fontWeight="bold">{post.title}</Text>
//                 <Text mt={2}>{post.content}</Text>
//                 <Text><strong>Plot Area:</strong> {post.plotArea.value} {post.plotArea.unit}</Text>
//                 <Text><strong>Plot Price:</strong> {post.plotPrice}</Text>
//                 <Text><strong>Plot Location:</strong> {post.plotLocation}</Text>
//                 <Box style={{ marginLeft: '20px' }}>
//                   <Text fontWeight="bold">Highlights:</Text>
//                   <UnorderedList>
//                     {post.highlights && post.highlights.map((highlight, highlightIndex) => (
//                       <ListItem key={highlightIndex}>{highlight}</ListItem>
//                     ))}
//                   </UnorderedList>
//                 </Box>
//               </Box>
//               <Button mt={4} colorScheme="teal" alignSelf={{ base: 'center', md: 'flex-start' }}>
//                 View More
//               </Button>
//             </Box>
//           </Flex>
//         ))}
//         <Stack direction="row" spacing={4} align="center" justify="center" mt={4}>
//           <Button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             leftIcon={<ChevronLeftIcon />}
//             variant="outline"
//             colorScheme="teal"
//           >
//             Previous
//           </Button>
//           {[...Array(totalPages).keys()].map((page) => (
//             <Button
//               key={page}
//               onClick={() => handlePageChange(page + 1)}
//               variant={currentPage === page + 1 ? "solid" : "outline"}
//               colorScheme={currentPage === page + 1 ? "teal" : "gray"}
//             >
//               {page + 1}
//             </Button>
//           ))}
//           <Button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             rightIcon={<ChevronRightIcon />}
//             variant="outline"
//             colorScheme="teal"
//           >
//             Next
//           </Button>
//         </Stack>
//       </VStack>
//     </div>
//   );
// }

// export default Posts;








// Working with caruosal also
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory, useLocation } from 'react-router-dom';
// import { Button, Box, Text, UnorderedList, ListItem, VStack, Flex, Stack } from '@chakra-ui/react';
// import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// function Posts() {
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const history = useHistory();
//   const query = useQuery();
//   const type = query.get('type');
//   const itemsPerPage = 2;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [keyCounter, setKeyCounter] = useState(0); // State to force re-render of Carousel

//   useEffect(() => {
//     const fetchFilteredPosts = async () => {
//       if (!type) {
//         alert('No type specified');
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/posts/type?type=${type}`);
//         setFilteredPosts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
//         alert('Failed to fetch posts');
//       }
//     };

//     fetchFilteredPosts();
//   }, [type]);

//   const handleAdminLogin = () => {
//     history.push('/login');
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     setKeyCounter(keyCounter + 1); // Increment keyCounter to force Carousel re-render
//   };

//   const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

//   if (!type) {
//     return <div>No type specified</div>;
//   }

//   return (
//     <div className="Posts">
//       <Button onClick={handleAdminLogin}>Admin Login</Button>
//       <h2>{type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Posts` : 'Posts'}</h2>
//       <VStack spacing={4} align="stretch">
//         {filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((post, index) => (
//           <Flex
//             key={index}
//             direction={{ base: 'column', md: 'row' }}
//             border="1px solid"
//             borderColor="gray.200"
//             borderRadius="md"
//             overflow="hidden"
//             w="100%"
//             h={{ base: 'auto', md: '300px' }}
//           >
//             <Box flex={{ base: '0 0 auto', md: '0 0 50%' }} h={{ base: '200px', md: '100%' }}>
//               <Carousel
//                 key={`carousel-${keyCounter}-${index}`} // Ensure Carousel component re-renders when keyCounter or index changes
//                 showThumbs={false}
//                 showStatus={false}
//                 infiniteLoop
//                 autoPlay
//                 interval={3000} // Interval in milliseconds (default is 3000)
//                 renderArrowPrev={(onClickHandler, hasPrev, label) =>
//                   hasPrev && (
//                     <Button
//                       onClick={onClickHandler}
//                       className="arrow prev"
//                       aria-label={label}
//                       leftIcon={<ChevronLeftIcon />}
//                       position="absolute"
//                       top="50%"
//                       transform="translateY(-50%)"
//                       zIndex="1"
//                       ml="4"
//                       bg="transparent"
//                       _hover={{ bg: 'transparent' }}
//                     />
//                   )
//                 }
//                 renderArrowNext={(onClickHandler, hasNext, label) =>
//                   hasNext && (
//                     <Button
//                       onClick={onClickHandler}
//                       className="arrow next"
//                       aria-label={label}
//                       rightIcon={<ChevronRightIcon />}
//                       position="absolute"
//                       top="50%"
//                       transform="translateY(-50%)"
//                       zIndex="1"
//                       mr="4"
//                       bg="transparent"
//                       _hover={{ bg: 'transparent' }}
//                     />
//                   )
//                 }
//               >
//                 {post.pics && post.pics.map((pic, picIndex) => {
//                   console.log(`Rendering image ${picIndex} for post ${index}:`, pic);
//                   return (
//                     <div key={`${index}-${picIndex}`} style={{ position: 'relative' }}>
//                       <img src={pic} alt={`Post Image ${picIndex}`} key={picIndex} />
//                     </div>
//                   );
//                 })}
//               </Carousel>
//             </Box>
//             <Box flex={{ base: '0 0 auto', md: '0 0 50%' }} p={4} display="flex" flexDirection="column" justifyContent="space-between">
//               <Box>
//                 <Text fontSize="lg" fontWeight="bold">{post.title}</Text>
//                 <Text mt={2}>{post.content}</Text>
//                 <Text><strong>Plot Area:</strong> {post.plotArea.value} {post.plotArea.unit}</Text>
//                 <Text><strong>Plot Price:</strong> {post.plotPrice}</Text>
//                 <Text><strong>Plot Location:</strong> {post.plotLocation}</Text>
//                 <Box style={{ marginLeft: '20px' }}>
//                   <Text fontWeight="bold">Highlights:</Text>
//                   <UnorderedList>
//                     {post.highlights && post.highlights.map((highlight, highlightIndex) => (
//                       <ListItem key={highlightIndex}>{highlight}</ListItem>
//                     ))}
//                   </UnorderedList>
//                 </Box>
//               </Box>
//               <Button mt={4} colorScheme="teal" alignSelf={{ base: 'center', md: 'flex-start' }}>
//                 View More
//               </Button>
//             </Box>
//           </Flex>
//         ))}
//         <Stack direction="row" spacing={4} align="center" justify="center" mt={4}>
//           <Button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             leftIcon={<ChevronLeftIcon />}
//             variant="outline"
//             colorScheme="teal"
//           >
//             Previous
//           </Button>
//           {[...Array(totalPages).keys()].map((page) => (
//             <Button
//               key={page + 1}
//               onClick={() => handlePageChange(page + 1)}
//               variant={currentPage === page + 1 ? "solid" : "outline"}
//               colorScheme={currentPage === page + 1 ? "teal" : "gray"}
//             >
//               {page + 1}
//             </Button>
//           ))}
//           <Button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             rightIcon={<ChevronRightIcon />}
//             variant="outline"
//             colorScheme="teal"
//           >
//             Next
//           </Button>
//         </Stack>
//       </VStack>
//     </div>
//   );
// }

// export default Posts;



// Search bar , dots, buttons for carosel , black overlay also added
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Box,
  Text,
  UnorderedList,
  ListItem,
  VStack,
  Flex,
  Stack,
  Input,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../App.css';
import PostsHeader from '../Miscellaneous/PostsHeader'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Posts() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const query = useQuery();
  const type = query.get('type');
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [keyCounter, setKeyCounter] = useState(0); // State to force re-render of Carousel

  useEffect(() => {
    const fetchPosts = async () => {
      if (!type) {
        alert('No type specified');
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/type?type=${type}`
        );
        setAllPosts(response.data);
        setFilteredPosts(response.data); // Initialize filteredPosts with all posts
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
    setKeyCounter(keyCounter + 1); // Increment keyCounter to force Carousel re-render
  };

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  if (!type) {
    return <div>No type specified</div>;
  }

  return (
    <>
    <PostsHeader />
    <Box paddingBottom="70px"></Box>
    <Box className="Posts" bg="#F3F5F1" color="black" p="20px">

    <Flex alignItems="center">
  <Text
    flex="1" // Take full width of available space
    textAlign="left" // Align text on the left
    marginBottom="10px" // Adjust marginBottom as needed
    fontSize="27px"
  >
    {type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Posts` : 'Posts'}
  </Text>
  <Box flex="1" ml="auto" textAlign="right" mt="10px"> {/* Add marginTop here */}
    <Input
      marginTop="20px"
      placeholder="Search by location"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      mb={10}
      w="100%" // Full width of the Input
      variant="filled"
      bg="white"
      _hover={{ bg: '#E2E8F0' }}
    />
  </Box>
</Flex>


      <VStack spacing={4} align="stretch">
        {filteredPosts.length === 0 ? (
          <Text 
           color="black"
           textAlign="center"
          >No posts found</Text>
        ) : (
          filteredPosts
            .slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
            .map((post, index) => (
              <Flex
                key={index}
                direction={{ base: 'column', md: 'row' }}
                boxShadow="xl" // Add box shadow
                bg="white" // Set white background
                borderRadius="md" // Add border radius
                overflow="hidden"
                w="100%"
                minH={{ base: 'auto', md: '300px' }} // Ensures minimum height is set for larger screens
                mb={4}
                position="relative"
              >
                <Box
                  flex="1"
                  minH="300px"
                  maxH="300px"
                  overflow="hidden"
                  position="relative"
                >
                  {/* Black overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Black overlay color
                      zIndex: 1,
                    }}
                  />
                  <Carousel
                    key={`carousel-${keyCounter}-${index}`} // Ensure Carousel component re-renders when keyCounter or index changes
                    showThumbs={false}
                    showStatus={true}
                    infiniteLoop
                    autoPlay
                    interval={2000} // Interval in milliseconds
                    className="custom-carousel"
                    style={{ zIndex: 0 }}
                  >
                    {post.pics &&
                      post.pics.map((pic, picIndex) => (
                        <div
                          key={`${index}-${picIndex}`}
                          style={{
                            position: 'relative',
                            height: '100%',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={pic}
                            alt={`Post Image ${picIndex}`}
                            key={picIndex}
                            style={{
                              width: '100%',
                              height: '300px',
                              objectFit: 'cover',
                              objectPosition: 'center',
                            }}
                          />
                        </div>
                      ))}
                  </Carousel>
                </Box>
                <Box
                  color="black"
                  flex="1"
                  p={4}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  zIndex={2} // Ensure text content is above the black overlay
                >
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">
                      {post.title}
                    </Text>
                    <Text mt={2}>{post.content}</Text>
                    <Text>
                      <strong>Plot Area:</strong> {post.plotArea.value}{' '}
                      {post.plotArea.unit}
                    </Text>
                    <Text>
                      <strong>Plot Price:</strong> {post.plotPrice}
                    </Text>
                    <Text>
                      <strong>Plot Location:</strong> {post.plotLocation}
                    </Text>
                    <Box mt={2}>
                      <Text fontWeight="bold">Highlights:</Text>
                      <UnorderedList ml={4}>
                        {post.highlights &&
                          post.highlights.map((highlight, highlightIndex) => (
                            <ListItem key={highlightIndex}>
                              {highlight}
                            </ListItem>
                          ))}
                      </UnorderedList>
                    </Box>
                  </Box>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    alignSelf={{ base: 'center', md: 'flex-start' }}
                  >
                    View More
                  </Button>
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
            variant={currentPage === page + 1 ? 'solid' : 'outline'}
            colorScheme={currentPage === page + 1 ? 'teal' : 'gray'}
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
    </Box>
    </>
  );
}

export default Posts;





