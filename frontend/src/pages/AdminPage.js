// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Box, Text, UnorderedList, ListItem } from '@chakra-ui/react';
// import { useHistory } from 'react-router-dom';

// const AdminPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [plotAreaValue, setPlotAreaValue] = useState('');
//   const [plotAreaUnit, setPlotAreaUnit] = useState('yards');
//   const [plotPrice, setPlotPrice] = useState('');
//   const [plotLocation, setPlotLocation] = useState('');
//   const [pics, setPics] = useState([]);
//   const [highlights, setHighlights] = useState(['']); // Initialize with default empty string
//   const [type, setType] = useState('residential'); // Initialize with default value
//   const [currentPostId, setCurrentPostId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPicLoading, setIsPicLoading] = useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [greeting, setGreeting] = useState('');
//   const [userName, setUserName] = useState('');
//   const [loadingPosts, setLoadingPosts] = useState(true);
//   const history = useHistory();

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     if (!userInfo || !userInfo.name) {
//       window.alert('You need to log in');
//       history.push('/login');
//     } else {
//       setUserName(userInfo.name);
//       fetchPosts();
//     }
//   }, [history]);

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour >= 0 && hour < 12) {
//       setGreeting('Good morning');
//     } else if (hour >= 12 && hour < 18) {
//       setGreeting('Good afternoon');
//     } else if (hour >= 18 && hour < 24) {
//       setGreeting('Good evening');
//     } else {
//       setGreeting('Good night');
//     }
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/posts');
//       setPosts(response.data);
//       setLoadingPosts(false);
//     } catch (error) {
//       console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
//       alert('Failed to fetch posts');
//       setLoadingPosts(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const postData = { title, content, plotArea: { value: plotAreaValue, unit: plotAreaUnit }, plotPrice, plotLocation, pics, highlights, type };
//     setIsLoading(true);
//     try {
//       let response;
//       if (currentPostId) {
//         response = await axios.put(`http://localhost:5000/api/posts/${currentPostId}`, postData);
//       } else {
//         response = await axios.post('http://localhost:5000/api/posts', postData);
//       }
//       clearForm();
//       setIsLoading(false);
//       alert(`Post ${currentPostId ? 'updated' : 'created'} successfully!`);
//       const updatedPosts = currentPostId ? posts.map(post => post._id === currentPostId ? response.data : post) : [...posts, response.data];
//       setPosts(updatedPosts);
//       onClose();
//     } catch (error) {
//       console.error(error.response?.data?.error || error.message);
//       alert('Failed to ' + (currentPostId ? 'update' : 'create') + ' post: ' + (error.response?.data?.error || error.message));
//       setIsLoading(false);
//     }
//   };

//   const clearForm = () => {
//     setTitle('');
//     setContent('');
//     setPlotAreaValue('');
//     setPlotAreaUnit('yards');
//     setPlotPrice('');
//     setPlotLocation('');
//     setPics([]);
//     setHighlights(['']);
//     setType('residential');
//     setCurrentPostId(null);
//   };

//   const handleAddHighlight = () => {
//     setHighlights([...highlights, '']);
//   };

//   const handleRemoveHighlight = (index) => {
//     const updatedHighlights = highlights.filter((_, i) => i !== index);
//     setHighlights(updatedHighlights);
//   };

//   const startEdit = (post) => {
//     setTitle(post.title);
//     setContent(post.content);
//     setPlotAreaValue(post.plotArea.value);
//     setPlotAreaUnit(post.plotArea.unit);
//     setPlotPrice(post.plotPrice);
//     setPlotLocation(post.plotLocation);
//     setPics(post.pics);
//     setHighlights(post.highlights || ['']);
//     setType(post.type); // Populate type field
//     setCurrentPostId(post._id);
//     onOpen();
//   };

//   const deletePost = async (post) => {
//     const isConfirmed = window.confirm('Are you sure you want to delete this post?');
//     if (!isConfirmed) {
//       return;
//     }
//     try {
//       await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
//       const updatedPosts = posts.filter(p => p._id !== post._id);
//       setPosts(updatedPosts);
//       alert('Post deleted successfully!');
//     } catch (error) {
//       console.error('Failed to delete post:', error.response?.data?.error || error.message);
//       alert('Failed to delete post: ' + (error.response?.data?.error || error.message));
//     }
//   };

//   const postDetails = async (files) => {
//     try {
//       setIsPicLoading(true);
//       const promises = Array.from(files).map(file => {
//         const data = new FormData();
//         data.append('file', file);
//         data.append('upload_preset', 'real-estate');
//         data.append('cloud_name', 'dtsi0uvsr');
//         return fetch('https://api.cloudinary.com/v1_1/dtsi0uvsr/image/upload', {
//           method: 'POST',
//           body: data,
//         });
//       });

//       const responses = await Promise.all(promises);
//       const responseData = await Promise.all(responses.map(response => response.json()));
//       const imageUrls = responseData.map(data => data.url);
//       setPics([...pics, ...imageUrls]);
//       setIsPicLoading(false);
//     } catch (error) {
//       console.error('Error uploading pictures:', error);
//       alert('Error uploading pictures');
//       setIsPicLoading(false);
//     }
//   };

//   const handleRemovePic = (index) => {
//     const updatedPics = pics.filter((_, i) => i !== index);
//     setPics(updatedPics);
//   };

//   const gotoHome = () => {
//     history.push("/");
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     history.push('/login');
//   };

//   return (
//     <>
//       <div>
//         {greeting}, {userName || "Guest"}
//       </div>
//       <Button onClick={onOpen}>Post something..!</Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>
//             {currentPostId ? "Edit Post" : "Create Post"}
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label>Title:</label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Content:</label>
//                 <textarea
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Plot Area Value:</label>
//                 <input
//                   type="number"
//                   value={plotAreaValue}
//                   onChange={(e) => setPlotAreaValue(e.target.value)}
//                   required
//                 />
//                 <select
//                   value={plotAreaUnit}
//                   onChange={(e) => setPlotAreaUnit(e.target.value)}
//                 >
//                   <option value="yards">Yards</option>
//                   <option value="meters">Meters</option>
//                   <option value="acres">Acres</option>
//                 </select>
//               </div>
//               <div>
//                 <label>Plot Price:</label>
//                 <input
//                   type="number"
//                   value={plotPrice}
//                   onChange={(e) => setPlotPrice(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Plot Location:</label>
//                 <input
//                   type="text"
//                   value={plotLocation}
//                   onChange={(e) => setPlotLocation(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Type:</label>
//                 <select
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                   required
//                 >
//                   <option value="residential">Residential</option>
//                   <option value="commercial">Commercial</option>
//                 </select>
//               </div>
//               <div>
//                 <label>Pictures:</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={(e) => postDetails(e.target.files)}
//                 />
//                 {isPicLoading ? (
//                   <div>Loading...</div>
//                 ) : (
//                   pics.map((pic, index) => (
//                     <div key={index} style={{ position: "relative" }}>
//                       <img
//                         src={pic}
//                         alt={`Chosen ${index}`}
//                         style={{ maxWidth: "100px", maxHeight: "100px" }}
//                       />
//                       <Button
//                         style={{
//                           position: "absolute",
//                           top: "5px",
//                           right: "5px",
//                         }}
//                         onClick={() => handleRemovePic(index)}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ))
//                 )}
//               </div>
//               {/* Highlights section */}
//               <div>
//                 <label>Highlights:</label>
//                 {highlights.map((highlight, index) => (
//                   <div
//                     key={index}
//                     style={{ display: "flex", marginBottom: "8px" }}
//                   >
//                     <input
//                       type="text"
//                       value={highlight}
//                       onChange={(e) => {
//                         const updatedHighlights = [...highlights];
//                         updatedHighlights[index] = e.target.value;
//                         setHighlights(updatedHighlights);
//                       }}
//                       required
//                     />
//                     <Button onClick={() => handleRemoveHighlight(index)} ml={2}>
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//                 <Button onClick={handleAddHighlight}>Add Highlight</Button>
//               </div>
//               {/* End of Highlights section */}
//               <Button
//                 type="submit"
//                 colorScheme="blue"
//                 mr={3}
//                 isLoading={isLoading}
//                 loadingText="Submitting..."
//               >
//                 {currentPostId ? "Update Post" : "Create Post"}
//               </Button>
//               {currentPostId && (
//                 <Button variant="ghost" onClick={onClose}>
//                   Cancel Edit
//                 </Button>
//               )}
//             </form>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//       <Button onClick={gotoHome}>Home</Button>
//       <Button onClick={handleLogout}>Logout</Button>

//       {loadingPosts ? (
//         <p>Loading...</p>
//       ) : posts.length === 0 ? (
//         <p>No posts found.</p>
//       ) : (
//         <>
//           <h2>All Posts</h2>
//           <ul>
//             {posts.map((post) => (
//               <li key={post._id}>
//                 <h3>{post.title}</h3>
//                 <p>{post.content}</p>
//                 <p>
//                   <strong>Plot Area:</strong> {post.plotArea.value} {post.plotArea.unit}
//                 </p>
//                 <p>
//                   <strong>Plot Price:</strong> {post.plotPrice}
//                 </p>
//                 <p>
//                   <strong>Plot Location:</strong> {post.plotLocation}
//                 </p>
//                 <p>
//                   <strong>Type:</strong> {post.type}
//                 </p>
//                 <Box style={{ marginLeft: '20px' }}>
//                   <Text fontWeight="bold">Highlights:</Text>
//                   <UnorderedList>
//                     {post.highlights.map((highlight, index) => (
//                       <ListItem key={index}>{highlight}</ListItem>
//                     ))}
//                   </UnorderedList>
//                 </Box>
//                 <div>
//                   {post.pics &&
//                     post.pics.map((pic, index) => (
//                       <div key={index} style={{ position: "relative" }}>
//                         <img
//                           src={pic}
//                           alt={`Post ${index}`}
//                           style={{ maxWidth: "100px", maxHeight: "100px" }}
//                         />
//                       </div>
//                     ))}
//                 </div>
//                 <Button onClick={() => startEdit(post)}>Edit</Button>
//                 <Button onClick={() => deletePost(post)}>Delete</Button>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </>
//   );
// }

// export default AdminPage;




// without prev, next
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Box,
//   Text,
//   UnorderedList,
//   ListItem,
//   Flex,
//   Image,
//   Grid,
//   GridItem,
// } from '@chakra-ui/react';
// import { useHistory } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const AdminPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [plotAreaValue, setPlotAreaValue] = useState('');
//   const [plotAreaUnit, setPlotAreaUnit] = useState('yards');
//   const [plotPrice, setPlotPrice] = useState('');
//   const [plotLocation, setPlotLocation] = useState('');
//   const [pics, setPics] = useState([]);
//   const [highlights, setHighlights] = useState(['']);
//   const [type, setType] = useState('residential');
//   const [currentPostId, setCurrentPostId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPicLoading, setIsPicLoading] = useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [greeting, setGreeting] = useState('');
//   const [userName, setUserName] = useState('');
//   const [loadingPosts, setLoadingPosts] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 4; // Adjust this value for the number of posts per page
//   const history = useHistory();

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     if (!userInfo || !userInfo.name) {
//       window.alert('You need to log in');
//       history.push('/login');
//     } else {
//       setUserName(userInfo.name);
//       fetchPosts();
//     }
//   }, [history]);

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour >= 0 && hour < 12) {
//       setGreeting('Good morning');
//     } else if (hour >= 12 && hour < 18) {
//       setGreeting('Good afternoon');
//     } else if (hour >= 18 && hour < 24) {
//       setGreeting('Good evening');
//     } else {
//       setGreeting('Good night');
//     }
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/posts');
//       setPosts(response.data);
//       setLoadingPosts(false);
//     } catch (error) {
//       console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
//       alert('Failed to fetch posts');
//       setLoadingPosts(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const postData = { title, content, plotArea: { value: plotAreaValue, unit: plotAreaUnit }, plotPrice, plotLocation, pics, highlights, type };
//     setIsLoading(true);
//     try {
//       let response;
//       if (currentPostId) {
//         response = await axios.put(`http://localhost:5000/api/posts/${currentPostId}`, postData);
//       } else {
//         response = await axios.post('http://localhost:5000/api/posts', postData);
//       }
//       clearForm();
//       setIsLoading(false);
//       alert(`Post ${currentPostId ? 'updated' : 'created'} successfully!`);
//       const updatedPosts = currentPostId ? posts.map(post => post._id === currentPostId ? response.data : post) : [...posts, response.data];
//       setPosts(updatedPosts);
//       onClose();
//     } catch (error) {
//       console.error(error.response?.data?.error || error.message);
//       alert('Failed to ' + (currentPostId ? 'update' : 'create') + ' post: ' + (error.response?.data?.error || error.message));
//       setIsLoading(false);
//     }
//   };

//   const clearForm = () => {
//     setTitle('');
//     setContent('');
//     setPlotAreaValue('');
//     setPlotAreaUnit('yards');
//     setPlotPrice('');
//     setPlotLocation('');
//     setPics([]);
//     setHighlights(['']);
//     setType('residential');
//     setCurrentPostId(null);
//   };

//   const handleAddHighlight = () => {
//     setHighlights([...highlights, '']);
//   };

//   const handleRemoveHighlight = (index) => {
//     const updatedHighlights = highlights.filter((_, i) => i !== index);
//     setHighlights(updatedHighlights);
//   };

//   const startEdit = (post) => {
//     setTitle(post.title);
//     setContent(post.content);
//     setPlotAreaValue(post.plotArea.value);
//     setPlotAreaUnit(post.plotArea.unit);
//     setPlotPrice(post.plotPrice);
//     setPlotLocation(post.plotLocation);
//     setPics(post.pics);
//     setHighlights(post.highlights || ['']);
//     setType(post.type);
//     setCurrentPostId(post._id);
//     onOpen();
//   };

//   const deletePost = async (post) => {
//     const isConfirmed = window.confirm('Are you sure you want to delete this post?');
//     if (!isConfirmed) {
//       return;
//     }
//     try {
//       await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
//       const updatedPosts = posts.filter(p => p._id !== post._id);
//       setPosts(updatedPosts);
//       alert('Post deleted successfully!');
//     } catch (error) {
//       console.error('Failed to delete post:', error.response?.data?.error || error.message);
//       alert('Failed to delete post: ' + (error.response?.data?.error || error.message));
//     }
//   };

//   const postDetails = async (files) => {
//     try {
//       setIsPicLoading(true);
//       const promises = Array.from(files).map(file => {
//         const data = new FormData();
//         data.append('file', file);
//         data.append('upload_preset', 'real-estate');
//         data.append('cloud_name', 'dtsi0uvsr');
//         return fetch('https://api.cloudinary.com/v1_1/dtsi0uvsr/image/upload', {
//           method: 'POST',
//           body: data,
//         });
//       });

//       const responses = await Promise.all(promises);
//       const responseData = await Promise.all(responses.map(response => response.json()));
//       const imageUrls = responseData.map(data => data.url);
//       setPics([...pics, ...imageUrls]);
//       setIsPicLoading(false);
//     } catch (error) {
//       console.error('Error uploading pictures:', error);
//       alert('Error uploading pictures');
//       setIsPicLoading(false);
//     }
//   };

//   const handleRemovePic = (index) => {
//     const updatedPics = pics.filter((_, i) => i !== index);
//     setPics(updatedPics);
//   };

//   const gotoHome = () => {
//     history.push("/");
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     history.push('/login');
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   return (
//     <>
//       <div>
//         {greeting}, {userName || "Guest"}
//       </div>
//       <Button onClick={onOpen}>Post something..!</Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>
//             {currentPostId ? "Edit Post" : "Create Post"}
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label>Title:</label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Content:</label>
//                 <textarea
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Plot Area Value:</label>
//                 <input
//                   type="number"
//                   value={plotAreaValue}
//                   onChange={(e) => setPlotAreaValue(e.target.value)}
//                   required
//                 />
//                 <select
//                   value={plotAreaUnit}
//                   onChange={(e) => setPlotAreaUnit(e.target.value)}
//                 >
//                   <option value="yards">Yards</option>
//                   <option value="meters">Meters</option>
//                   <option value="acres">Acres</option>
//                 </select>
//               </div>
//               <div>
//                 <label>Plot Price:</label>
//                 <input
//                   type="number"
//                   value={plotPrice}
//                   onChange={(e) => setPlotPrice(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Plot Location:</label>
//                 <input
//                   type="text"
//                   value={plotLocation}
//                   onChange={(e) => setPlotLocation(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Type:</label>
//                 <select
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                   required
//                 >
//                   <option value="residential">Residential</option>
//                   <option value="commercial">Commercial</option>
//                 </select>
//               </div>
//               <div>
//                 <label>Pictures:</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={(e) => postDetails(e.target.files)}
//                 />
//                 {isPicLoading ? (
//                   <div>Loading...</div>
//                 ) : (
//                   pics.map((pic, index) => (
//                     <div key={index} style={{ position: "relative" }}>
//                       <img
//                         src={pic}
//                         alt={`Chosen ${index}`}
//                         style={{ maxWidth: "100px", maxHeight: "100px" }}
//                       />
//                       <Button
//                         style={{
//                           position: "absolute",
//                           top: "5px",
//                           right: "5px",
//                         }}
//                         onClick={() => handleRemovePic(index)}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ))
//                 )}
//               </div>
//               <div>
//                 <label>Highlights:</label>
//                 {highlights.map((highlight, index) => (
//                   <div
//                     key={index}
//                     style={{ display: "flex", marginBottom: "8px" }}
//                   >
//                     <input
//                       type="text"
//                       value={highlight}
//                       onChange={(e) => {
//                         const updatedHighlights = [...highlights];
//                         updatedHighlights[index] = e.target.value;
//                         setHighlights(updatedHighlights);
//                       }}
//                       required
//                     />
//                     <Button onClick={() => handleRemoveHighlight(index)} ml={2}>
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//                 <Button onClick={handleAddHighlight}>Add Highlight</Button>
//               </div>
//               <Button
//                 type="submit"
//                 colorScheme="blue"
//                 mr={3}
//                 isLoading={isLoading}
//                 loadingText="Submitting..."
//               >
//                 {currentPostId ? "Update Post" : "Create Post"}
//               </Button>
//               {currentPostId && (
//                 <Button variant="ghost" onClick={onClose}>
//                   Cancel Edit
//                 </Button>
//               )}
//             </form>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//       <Button onClick={gotoHome}>Home</Button>
//       <Button onClick={handleLogout}>Logout</Button>

//       {loadingPosts ? (
//         <p>Loading...</p>
//       ) : posts.length === 0 ? (
//         <p>No posts found.</p>
//       ) : (
//         <>
//           <h2>All Posts</h2>
//           <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
//             {currentPosts.map((post) => (
//               <GridItem key={post._id} border="1px solid #ccc" borderRadius="md" overflow="hidden">
//                 <Flex direction={{ base: 'column', md: 'row' }}>
//                   {post.pics && post.pics.length > 0 && (
//                     <Box width={{ base: '100%', md: '40%' }}>
//                       {post.pics.length > 1 ? (
//                         <Carousel showThumbs={false}>
//                           {post.pics.map((pic, index) => (
//                             <div key={index}>
//                               <Image src={pic} alt={`Post ${index}`} objectFit="cover" />
//                             </div>
//                           ))}
//                         </Carousel>
//                       ) : (
//                         <Image src={post.pics[0]} alt="Post image" objectFit="cover" width="100%" />
//                       )}
//                     </Box>
//                   )}
//                   <Box p={4} width={{ base: '100%', md: '60%' }}>
//                     <Text fontSize="xl" fontWeight="bold">{post.title}</Text>
//                     <Text>{post.content}</Text>
//                     <Text><strong>Plot Area:</strong> {post.plotArea.value} {post.plotArea.unit}</Text>
//                     <Text><strong>Plot Price:</strong> {post.plotPrice}</Text>
//                     <Text><strong>Plot Location:</strong> {post.plotLocation}</Text>
//                     <Text><strong>Type:</strong> {post.type}</Text>
//                     <Box mt={4}>
//                       <Text fontWeight="bold">Highlights:</Text>
//                       <UnorderedList>
//                         {post.highlights.map((highlight, index) => (
//                           <ListItem key={index}>{highlight}</ListItem>
//                         ))}
//                       </UnorderedList>
//                     </Box>
//                     <Button mt={2} onClick={() => startEdit(post)}>Edit</Button>
//                     <Button mt={2} ml={2} onClick={() => deletePost(post)}>Delete</Button>
//                   </Box>
//                 </Flex>
//               </GridItem>
//             ))}
//           </Grid>
//           <Flex mt={6} justifyContent="center">
//             {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
//               <Button key={index} onClick={() => handlePageChange(index + 1)} mx={1}>
//                 {index + 1}
//               </Button>
//             ))}
//           </Flex>
//         </>
//       )}
//     </>
//   );
// }

// export default AdminPage;









// new
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Box,
//   Text,
//   UnorderedList,
//   ListItem,
//   Flex,
//   Image,
//   Grid,
//   GridItem,
//   Container,
// } from '@chakra-ui/react';
// import { useHistory } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const AdminPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [plotAreaValue, setPlotAreaValue] = useState('');
//   const [plotAreaUnit, setPlotAreaUnit] = useState('yards');
//   const [plotPrice, setPlotPrice] = useState('');
//   const [plotLocation, setPlotLocation] = useState('');
//   const [pics, setPics] = useState([]);
//   const [highlights, setHighlights] = useState(['']);
//   const [type, setType] = useState('residential');
//   const [currentPostId, setCurrentPostId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPicLoading, setIsPicLoading] = useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [greeting, setGreeting] = useState('');
//   const [userName, setUserName] = useState('');
//   const [loadingPosts, setLoadingPosts] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 4; // Adjust this value for the number of posts per page
//   const history = useHistory();

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     if (!userInfo || !userInfo.name) {
//       window.alert('You need to log in');
//       history.push('/login');
//     } else {
//       setUserName(userInfo.name);
//       fetchPosts();
//     }
//   }, [history]);

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour >= 0 && hour < 12) {
//       setGreeting('Good morning');
//     } else if (hour >= 12 && hour < 18) {
//       setGreeting('Good afternoon');
//     } else if (hour >= 18 && hour < 24) {
//       setGreeting('Good evening');
//     } else {
//       setGreeting('Good night');
//     }
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/posts');
//       setPosts(response.data);
//       setLoadingPosts(false);
//     } catch (error) {
//       console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
//       alert('Failed to fetch posts');
//       setLoadingPosts(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const postData = { title, content, plotArea: { value: plotAreaValue, unit: plotAreaUnit }, plotPrice, plotLocation, pics, highlights, type };
//     setIsLoading(true);
//     try {
//       let response;
//       if (currentPostId) {
//         response = await axios.put(`http://localhost:5000/api/posts/${currentPostId}`, postData);
//       } else {
//         response = await axios.post('http://localhost:5000/api/posts', postData);
//       }
//       clearForm();
//       setIsLoading(false);
//       alert(`Post ${currentPostId ? 'updated' : 'created'} successfully!`);
//       const updatedPosts = currentPostId ? posts.map(post => post._id === currentPostId ? response.data : post) : [...posts, response.data];
//       setPosts(updatedPosts);
//       onClose();
//     } catch (error) {
//       console.error(error.response?.data?.error || error.message);
//       alert('Failed to ' + (currentPostId ? 'update' : 'create') + ' post: ' + (error.response?.data?.error || error.message));
//       setIsLoading(false);
//     }
//   };

//   const clearForm = () => {
//     setTitle('');
//     setContent('');
//     setPlotAreaValue('');
//     setPlotAreaUnit('yards');
//     setPlotPrice('');
//     setPlotLocation('');
//     setPics([]);
//     setHighlights(['']);
//     setType('residential');
//     setCurrentPostId(null);
//   };

//   const handleAddHighlight = () => {
//     setHighlights([...highlights, '']);
//   };

//   const handleRemoveHighlight = (index) => {
//     const updatedHighlights = highlights.filter((_, i) => i !== index);
//     setHighlights(updatedHighlights);
//   };

//   const startEdit = (post) => {
//     setTitle(post.title);
//     setContent(post.content);
//     setPlotAreaValue(post.plotArea.value);
//     setPlotAreaUnit(post.plotArea.unit);
//     setPlotPrice(post.plotPrice);
//     setPlotLocation(post.plotLocation);
//     setPics(post.pics);
//     setHighlights(post.highlights || ['']);
//     setType(post.type);
//     setCurrentPostId(post._id);
//     onOpen();
//   };

//   const deletePost = async (post) => {
//     const isConfirmed = window.confirm('Are you sure you want to delete this post?');
//     if (!isConfirmed) {
//       return;
//     }
//     try {
//       await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
//       const updatedPosts = posts.filter(p => p._id !== post._id);
//       setPosts(updatedPosts);
//       alert('Post deleted successfully!');
//     } catch (error) {
//       console.error('Failed to delete post:', error.response?.data?.error || error.message);
//       alert('Failed to delete post: ' + (error.response?.data?.error || error.message));
//     }
//   };

//   const postDetails = async (files) => {
//     try {
//       setIsPicLoading(true);
//       const promises = Array.from(files).map(file => {
//         const data = new FormData();
//         data.append('file', file);
//         data.append('upload_preset', 'real-estate');
//         data.append('cloud_name', 'dtsi0uvsr');
//         return fetch('https://api.cloudinary.com/v1_1/dtsi0uvsr/image/upload', {
//           method: 'POST',
//           body: data,
//         });
//       });

//       const responses = await Promise.all(promises);
//       const responseData = await Promise.all(responses.map(response => response.json()));
//       const imageUrls = responseData.map(data => data.url);
//       setPics([...pics, ...imageUrls]);
//       setIsPicLoading(false);
//     } catch (error) {
//       console.error('Error uploading pictures:', error);
//       alert('Error uploading pictures');
//       setIsPicLoading(false);
//     }
//   };

//   const handleRemovePic = (index) => {
//     const updatedPics = pics.filter((_, i) => i !== index);
//     setPics(updatedPics);
//   };

//   const gotoHome = () => {
//     history.push("/");
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     history.push('/login');
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(posts.length / postsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   return (
//     <>
//       <div>
//         {greeting}, {userName || "Guest"}
//       </div>
//       <Button onClick={onOpen}>Post something..!</Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>
//             {currentPostId ? "Edit Post" : "Create Post"}
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label>Title:</label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Content:</label>
//                 <textarea
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Plot Area Value:</label>
//                 <input
//                   type="number"
//                   value={plotAreaValue}
//                   onChange={(e) => setPlotAreaValue(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Plot Area Unit:</label>
//                 <select
//                   value={plotAreaUnit}
//                   onChange={(e) => setPlotAreaUnit(e.target.value)}
//                   required
//                 >
//                   <option value="yards">Yards</option>
//                   <option value="meters">Meters</option>
//                   <option value="acres">Acres</option>
//                   <option value="hectares">Hectares</option>
//                 </select>
//               </div>
//               <div>
//                 <label>Plot Price:</label>
//                 <input
//                   type="number"
//                   value={plotPrice}
//                   onChange={(e) => setPlotPrice(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Plot Location:</label>
//                 <input
//                   type="text"
//                   value={plotLocation}
//                   onChange={(e) => setPlotLocation(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Type:</label>
//                 <select
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                   required
//                 >
//                   <option value="residential">Residential</option>
//                   <option value="commercial">Commercial</option>
//                 </select>
//               </div>
//               <div>
//                 <label>Pictures:</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={(e) => postDetails(e.target.files)}
//                 />
//                 {isPicLoading ? (
//                   <div>Loading...</div>
//                 ) : (
//                   pics.map((pic, index) => (
//                     <div key={index} style={{ position: "relative" }}>
//                       <img
//                         src={pic}
//                         alt={`Chosen ${index}`}
//                         style={{ maxWidth: "100px", maxHeight: "100px" }}
//                       />
//                       <Button
//                         style={{
//                           position: "absolute",
//                           top: "5px",
//                           right: "5px",
//                         }}
//                         onClick={() => handleRemovePic(index)}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ))
//                 )}
//               </div>
//               <div>
//                 <label>Highlights:</label>
//                 {highlights.map((highlight, index) => (
//                   <div
//                     key={index}
//                     style={{ display: "flex", marginBottom: "8px" }}
//                   >
//                     <input
//                       type="text"
//                       value={highlight}
//                       onChange={(e) => {
//                         const updatedHighlights = [...highlights];
//                         updatedHighlights[index] = e.target.value;
//                         setHighlights(updatedHighlights);
//                       }}
//                       required
//                     />
//                     <Button onClick={() => handleRemoveHighlight(index)} ml={2}>
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//                 <Button onClick={handleAddHighlight}>Add Highlight</Button>
//               </div>
//               <Button
//                 type="submit"
//                 colorScheme="blue"
//                 mr={3}
//                 isLoading={isLoading}
//                 loadingText="Submitting..."
//               >
//                 {currentPostId ? "Update Post" : "Create Post"}
//               </Button>
//               {currentPostId && (
//                 <Button variant="ghost" onClick={onClose}>
//                   Cancel Edit
//                 </Button>
//               )}
//             </form>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//       <Button onClick={gotoHome}>Home</Button>
//       <Button onClick={handleLogout}>Logout</Button>

//       {loadingPosts ? (
//         <p>Loading...</p>
//       ) : posts.length === 0 ? (
//         <p>No posts found.</p>
//       ) : (
//         <>
//           <h2>All Posts</h2>



//           <Container maxW="container.lg" centerContent>
//   <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
//     {currentPosts.map((post) => (
//       <GridItem 
//         key={post._id} 
//         border="1px solid #ccc" 
//         borderRadius="md" 
//         overflow="hidden"
//         width="100%" 
//         height={{ base: 'auto', md: '200px' }} // Responsive height
//       >
//         <Flex 
//           direction={{ base: 'column', md: 'row' }} // Responsive direction
//           height="100%"
//         >
//           {post.pics && post.pics.length > 0 && (
//             <Box width={{ base: '100%', md: '200px' }} height={{ base: '150px', md: '100%' }}>
//               {post.pics.length > 1 ? (
//                 <Carousel showThumbs={false} showArrows={true} showIndicators={false}>
//                   {post.pics.map((pic, index) => (
//                     <div key={index}>
//                       <Image src={pic} alt={`Post ${index}`} objectFit="cover" height="100%" width="100%" />
//                     </div>
//                   ))}
//                 </Carousel>
//               ) : (
//                 <Image src={post.pics[0]} alt="Post image" objectFit="cover" height="100%" width="100%" />
//               )}
//             </Box>
//           )}
//           <Box p={2} flex="1">
//             <Text fontSize="lg" fontWeight="bold" textAlign="center">{post.title}</Text>
//             <Text textAlign="center">{post.content}</Text>
//             <Text><strong>Plot Area:</strong> {post.plotArea.value} {post.plotArea.unit}</Text>
//             <Text><strong>Plot Price:</strong> {post.plotPrice}</Text>
//             <Text><strong>Plot Location:</strong> {post.plotLocation}</Text>
//             <Text><strong>Type:</strong> {post.type}</Text>
//             <Box mt={1}>
//               <Text fontWeight="bold">Highlights:</Text>
//               <UnorderedList>
//                 {post.highlights.map((highlight, index) => (
//                   <ListItem key={index}>{highlight}</ListItem>
//                 ))}
//               </UnorderedList>
//             </Box>
//           </Box>
//           <Flex justifyContent="flex-end" p={2}>
//             <Button size="sm" onClick={() => startEdit(post)}>Edit</Button>
//             <Button size="sm" ml={2} onClick={() => deletePost(post)}>Delete</Button>
//           </Flex>
//         </Flex>
//       </GridItem>
//     ))}
//   </Grid>
// </Container>

          

//           <Flex mt={6} justifyContent="center">
//             <Button onClick={handlePreviousPage} disabled={currentPage === 1} mx={1}>
//               Previous
//             </Button>
//             {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
//               <Button key={index} onClick={() => handlePageChange(index + 1)} mx={1}>
//                 {index + 1}
//               </Button>
//             ))}
//             <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(posts.length / postsPerPage)} mx={1}>
//               Next
//             </Button>
//           </Flex>
//         </>
//       )}
//     </>
//   );
// }

// export default AdminPage;




// new + search same
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Box,
//   Text,
//   UnorderedList,
//   ListItem,
//   Flex,
//   Image,
//   Grid,
//   GridItem,
//   Container,
//   Input,
//   IconButton,
// } from '@chakra-ui/react';
// import { useHistory } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// const AdminPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [plotAreaValue, setPlotAreaValue] = useState('');
//   const [plotAreaUnit, setPlotAreaUnit] = useState('yards');
//   const [plotPrice, setPlotPrice] = useState('');
//   const [plotLocation, setPlotLocation] = useState('');
//   const [pics, setPics] = useState([]);
//   const [highlights, setHighlights] = useState(['']);
//   const [type, setType] = useState('residential');
//   const [currentPostId, setCurrentPostId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPicLoading, setIsPicLoading] = useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [greeting, setGreeting] = useState('');
//   const [userName, setUserName] = useState('');
//   const [loadingPosts, setLoadingPosts] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 4; // Adjust this value for the number of posts per page
//   const history = useHistory();
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     if (!userInfo || !userInfo.name) {
//       window.alert('You need to log in');
//       history.push('/login');
//     } else {
//       setUserName(userInfo.name);
//       fetchPosts();
//     }
//   }, [history]);

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour >= 0 && hour < 12) {
//       setGreeting('Good morning');
//     } else if (hour >= 12 && hour < 18) {
//       setGreeting('Good afternoon');
//     } else if (hour >= 18 && hour < 24) {
//       setGreeting('Good evening');
//     } else {
//       setGreeting('Good night');
//     }
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/posts');
//       setPosts(response.data);
//       setLoadingPosts(false);
//     } catch (error) {
//       console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
//       alert('Failed to fetch posts');
//       setLoadingPosts(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const postData = {
//       title,
//       content,
//       plotArea: { value: plotAreaValue, unit: plotAreaUnit },
//       plotPrice,
//       plotLocation,
//       pics,
//       highlights,
//       type,
//     };
//     setIsLoading(true);
//     try {
//       let response;
//       if (currentPostId) {
//         response = await axios.put(
//           `http://localhost:5000/api/posts/${currentPostId}`,
//           postData
//         );
//       } else {
//         response = await axios.post('http://localhost:5000/api/posts', postData);
//       }
//       clearForm();
//       setIsLoading(false);
//       alert(
//         `Post ${
//           currentPostId ? 'updated' : 'created'
//         } successfully!`
//       );
//       const updatedPosts = currentPostId
//         ? posts.map((post) =>
//             post._id === currentPostId ? response.data : post
//           )
//         : [...posts, response.data];
//       setPosts(updatedPosts);
//       onClose();
//       setCurrentPostId(null); // Reset currentPostId to null after form submission
//     } catch (error) {
//       console.error(error.response?.data?.error || error.message);
//       alert(
//         'Failed to ' +
//           (currentPostId ? 'update' : 'create') +
//           ' post: ' +
//           (error.response?.data?.error || error.message)
//       );
//       setIsLoading(false);
//     }
//   };
  

//   const clearForm = () => {
//     setTitle('');
//     setContent('');
//     setPlotAreaValue('');
//     setPlotAreaUnit('yards');
//     setPlotPrice('');
//     setPlotLocation('');
//     setPics([]);
//     setHighlights(['']);
//     setType('residential');
//     setCurrentPostId(null);
//   };

//   const handleAddHighlight = () => {
//     setHighlights([...highlights, '']);
//   };

//   const handleRemoveHighlight = (index) => {
//     const updatedHighlights = highlights.filter((_, i) => i !== index);
//     setHighlights(updatedHighlights);
//   };

//   const startEdit = (post) => {
//     setTitle(post.title);
//     setContent(post.content);
//     setPlotAreaValue(post.plotArea.value);
//     setPlotAreaUnit(post.plotArea.unit);
//     setPlotPrice(post.plotPrice);
//     setPlotLocation(post.plotLocation);
//     setPics(post.pics);
//     setHighlights(post.highlights || ['']);
//     setType(post.type);
//     setCurrentPostId(post._id);
//     onOpen();
//   };

//   const deletePost = async (post) => {
//     const isConfirmed = window.confirm('Are you sure you want to delete this post?');
//     if (!isConfirmed) {
//       return;
//     }
//     try {
//       await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
//       const updatedPosts = posts.filter(p => p._id !== post._id);
//       setPosts(updatedPosts);
//       alert('Post deleted successfully!');
//     } catch (error) {
//       console.error('Failed to delete post:', error.response?.data?.error || error.message);
//       alert('Failed to delete post: ' + (error.response?.data?.error || error.message));
//     }
//   };

//   const postDetails = async (files) => {
//     try {
//       setIsPicLoading(true);
//       const promises = Array.from(files).map(file => {
//         const data = new FormData();
//         data.append('file', file);
//         data.append('upload_preset', 'real-estate');
//         data.append('cloud_name', 'dtsi0uvsr');
//         return fetch('https://api.cloudinary.com/v1_1/dtsi0uvsr/image/upload', {
//           method: 'POST',
//           body: data,
//         });
//       });

//       const responses = await Promise.all(promises);
//       const responseData = await Promise.all(responses.map(response => response.json()));
//       const imageUrls = responseData.map(data => data.url);
//       setPics([...pics, ...imageUrls]);
//       setIsPicLoading(false);
//     } catch (error) {
//       console.error('Error uploading pictures:', error);
//       alert('Error uploading pictures');
//       setIsPicLoading(false);
//     }
//   };

//   const handleRemovePic = (index) => {
//     const updatedPics = pics.filter((_, i) => i !== index);
//     setPics(updatedPics);
//   };

//   const gotoHome = () => {
//     history.push("/");
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     history.push('/login');
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(posts.length / postsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;

//   const filteredPosts = posts.filter(post => 
//     post.plotLocation.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);


//   return (
//     <>
//       <div>
//         {greeting}, {userName || "Guest"}
//       </div>
//       <Button onClick={onOpen}>Post something..!</Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//   <ModalOverlay />
//   <ModalContent>
//     <ModalHeader>
//       {currentPostId ? "Edit Post" : "Create Post"}
//     </ModalHeader>
//     <ModalCloseButton />
//     <ModalBody>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Content:</label>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Plot Area:</label>
//           <input
//             type="number"
//             value={plotAreaValue}
//             onChange={(e) => setPlotAreaValue(e.target.value)}
//             required
//           />
//           <select
//             value={plotAreaUnit}
//             onChange={(e) => setPlotAreaUnit(e.target.value)}
//           >
//             <option value="yards">yards</option>
//             <option value="sqft">sqft</option>
//           </select>
//         </div>
//         <div>
//           <label>Plot Price:</label>
//           <input
//             type="number"
//             value={plotPrice}
//             onChange={(e) => setPlotPrice(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Plot Location:</label>
//           <input
//             type="text"
//             value={plotLocation}
//             onChange={(e) => setPlotLocation(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Pictures:</label>
//           <input
//             type="file"
//             multiple
//             onChange={(e) => postDetails(e.target.files)}
//           />
//           {isPicLoading && <div>Uploading pictures...</div>}
//           {pics.map((pic, index) => (
//             <div key={index}>
//               <img src={pic} alt="Uploaded" width="100" />
//               <Button onClick={() => handleRemovePic(index)}>Remove</Button>
//             </div>
//           ))}
//         </div>
//         <div>
//           <label>Highlights:</label>
//           {highlights.map((highlight, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 value={highlight}
//                 onChange={(e) =>
//                   setHighlights(
//                     highlights.map((h, i) =>
//                       i === index ? e.target.value : h
//                     )
//                   )
//                 }
//               />
//               {index > 0 && (
//                 <Button onClick={() => handleRemoveHighlight(index)}>
//                   Remove
//                 </Button>
//               )}
//             </div>
//           ))}
//           <Button onClick={handleAddHighlight}>Add Highlight</Button>
//         </div>
//         <div>
//           <label>Type:</label>
//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="residential">Residential</option>
//             <option value="commercial">Commercial</option>
//           </select>
//         </div>
//         <Button type="submit" isLoading={isLoading}>
//           {currentPostId ? "Update" : "Submit"}
//         </Button>
//       </form>
//     </ModalBody>
//   </ModalContent>
// </Modal>

      
//       <Box mt={8}>
//         <Flex justify="space-between" align="center" mb={8} px={8} width="100%">
//           <Text fontSize="2xl" fontWeight="bold" flex="1">
//             All Posts
//           </Text>
//           <Input
//             placeholder="Search by location"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             width={{ base: "100%", md: "auto" }}
//             maxWidth="300px"
//             flex="1"
//             ml={{ base: 0, md: 4 }}
//           />
//         </Flex>

//         {loadingPosts ? (
//           <div>Loading posts...</div>
//         ) : currentPosts.length === 0 ? (
//           <div>No posts available</div>
//         ) : (
//           <Container maxW="container.xl" centerContent>
//             <Flex
//               direction="row"
//               flexWrap="wrap"
//               justifyContent="center" // Center align on smaller screens
//               gap={6}
//             >
//               {currentPosts.map((post) => (
                
//                 <Box
//                   key={post._id}
//                   borderWidth="1px"
//                   borderRadius="lg"
//                   overflow="hidden"
//                   mb={4}
//                   flexBasis={{ base: "90%", md: "50%" }} // Adjusted to maintain responsiveness
//                   position="relative"
//                   height="auto" // Changed to auto for responsive height
//                   maxW={{ base: "90%", md: "48%" }} // Ensure that the max width is set to maintain responsiveness
//                   width={{ base: "90%", md: "48%" }} // 90% width on small screens, 48% width on medium screens
//                   // bg="orange"
//                 >
//                   <Flex
//                     direction={{ base: "column", md: "row" }}
//                     gap={4}
//                     height="100%"
//                   >
//                     <Box
//                       flexBasis={{ base: "100%", md: "50%" }}
//                       position="relative"
//                       overflow="hidden"
//                       borderRadius="lg"
//                       height="auto"
//                       // bg="red"
//                     >
//                       <Carousel
//                         renderArrow={({ type, onClick }) => (
//                           <IconButton
//                             aria-label={type === "prev" ? "Previous" : "Next"}
//                             icon={
//                               type === "prev" ? (
//                                 <ChevronLeftIcon />
//                               ) : (
//                                 <ChevronRightIcon />
//                               )
//                             }
//                             onClick={onClick}
//                             position="absolute"
//                             top="50%"
//                             transform="translateY(-50%)"
//                             zIndex="1"
//                             bgColor="rgba(0, 0, 0, 0.4)"
//                             color="white"
//                             _hover={{ bgColor: "rgba(0, 0, 0, 0.6)" }}
//                             size="sm"
//                             left={type === "prev" ? "4px" : "auto"}
//                             right={type === "next" ? "4px" : "auto"}
//                           />
//                         )}
//                       >
//                         {post.pics.map((pic, index) => (
//                           <div key={index} >
//                             <Image
//                               src={pic}
//                               alt={`Post picture ${index + 1}`}
//                               objectFit="cover"
//                               p={4}
//                               // height="100%"
//                               // width="100%"
//                             />
//                           </div>
//                         ))}
//                       </Carousel>
//                     </Box>

//                     <Box
//                       flexBasis={{ base: "100%", md: "50%" }}
//                       // bg="yellow"
//                       alignItems="center"
//                       textAlign="center"
//                       p={8}
//                       display='flex'
//                       flexDirection='column'
//                       justifyContent='space-between'
//                     >
//                       <Box>
//                         <Text fontSize="xl" fontWeight="bold" mb={2}>
//                           {post.title}
//                         </Text>
//                         <Text mb={2}>Location: {post.plotLocation}</Text>
//                         <Text mb={2}>
//                           Area: {post.plotArea.value} {post.plotArea.unit}
//                         </Text>
//                         <Text mb={2}>Price: {post.plotPrice}</Text>
//                         <UnorderedList
//                           mb={2}
//                           style={{
//                             textAlign: "left",
//                             marginLeft: "auto",
//                             marginRight: "auto",
//                             width: "fit-content",
//                           }}
//                         >
//                           {post.highlights.map((highlight, index) => (
//                             <ListItem
//                               key={index}
//                               style={{
//                                 textAlign: "center",
//                                 listStylePosition: "inside",
//                               }}
//                             >
//                               {highlight}
//                             </ListItem>
//                           ))}
//                         </UnorderedList>
//                         <Text mb={2}>Type: {post.type}</Text>
//                       </Box>
//                       <Box>
//                         <Flex justifyContent="center">
//                           <Button onClick={() => startEdit(post)} mr={2}>
//                             Edit
//                           </Button>
//                           <Button onClick={() => deletePost(post)}>Delete</Button>
//                         </Flex>
//                       </Box>
//                     </Box>
//                   </Flex>
//                 </Box>

                
   
//               ))}
//             </Flex>
//           </Container>
//         )}
//         <Flex justify="center" mt={4}>
//           <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
//             Previous
//           </Button>
//           {Array.from({
//             length: Math.ceil(filteredPosts.length / postsPerPage),
//           }).map((_, index) => (
//             <Button
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               isActive={currentPage === index + 1}
//             >
//               {index + 1}
//             </Button>
//           ))}
//           <Button
//             onClick={handleNextPage}
//             disabled={
//               currentPage === Math.ceil(filteredPosts.length / postsPerPage)
//             }
//           >
//             Next
//           </Button>
//         </Flex>
//       </Box>
//       <Button onClick={handleLogout}>Logout</Button>
//       <Button onClick={gotoHome}>Home</Button>
//     </>
//   );
// };

// export default AdminPage;












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
  const postsPerPage = 4; // Adjust this value for the number of posts per page
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
      setCurrentPostId(null); // Reset currentPostId to null after form submission
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
    setType('residential');
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

  const gotoHome = () => {
    history.push("/");
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    history.push('/login');
  };

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
                  <label>Plot Area:</label>
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
                    <option value="yards">yards</option>
                    <option value="sqft">sqft</option>
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
                    multiple
                    onChange={(e) => postDetails(e.target.files)}
                  />
                  {isPicLoading && <div>Uploading pictures...</div>}
                  {pics.map((pic, index) => (
                    <div key={index}>
                      <img src={pic} alt="Uploaded" width="100" />
                      <Button onClick={() => handleRemovePic(index)}>Remove</Button>
                    </div>
                  ))}
                </div>
                <div>
                  <label>Highlights:</label>
                  {highlights.map((highlight, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) =>
                          setHighlights(
                            highlights.map((h, i) =>
                              i === index ? e.target.value : h
                            )
                          )
                        }
                      />
                      {index > 0 && (
                        <Button onClick={() => handleRemoveHighlight(index)}>
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button onClick={handleAddHighlight}>Add Highlight</Button>
                </div>
                <div>
                  <label>Type:</label>
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <Flex justify="space-between" mt={4}>
                  <Button type="submit" isLoading={isLoading}>
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
  

