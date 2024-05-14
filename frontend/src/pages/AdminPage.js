import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom'; 

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [plotAreaValue, setPlotAreaValue] = useState('');
  const [plotAreaUnit, setPlotAreaUnit] = useState('yards');
  const [plotPrice, setPlotPrice] = useState('');
  const [plotLocation, setPlotLocation] = useState('');
  const [pics, setPics] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPicLoading, setIsPicLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');
  const [loadingPosts, setLoadingPosts] = useState(true); // New state for loading posts
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
      setLoadingPosts(false); // Set loading state to false when posts are fetched
    } catch (error) {
      console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
      alert('Failed to fetch posts');
      setLoadingPosts(false); // Set loading state to false even if fetching fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content, plotArea: { value: plotAreaValue, unit: plotAreaUnit }, plotPrice, plotLocation, pics };
    setIsLoading(true);
    try {
      let response;
      if (currentPostId) {
        response = await axios.put(`http://localhost:5000/api/posts/${currentPostId}`, postData);
      } else {
        response = await axios.post('http://localhost:5000/api/posts', postData);
      }
      setTitle('');
      setContent('');
      setPlotAreaValue('');
      setPlotAreaUnit('yards');
      setPlotPrice('');
      setPlotLocation('');
      setPics([]);
      setCurrentPostId(null);
      setIsLoading(false);
      alert(`Post ${currentPostId ? 'updated' : 'created'} successfully!`);
      const updatedPosts = posts.map(post => post._id === currentPostId ? response.data : post);
      setPosts(currentPostId ? updatedPosts : [...posts, response.data]);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      alert('Failed to ' + (currentPostId ? 'update' : 'create') + ' post: ' + (error.response?.data?.error || error.message));
      setIsLoading(false);
    }
  };

  const startEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setPlotAreaValue(post.plotArea.value);
    setPlotAreaUnit(post.plotArea.unit);
    setPlotPrice(post.plotPrice);
    setPlotLocation(post.plotLocation);
    setPics(post.pics);
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
    const updatedPics = [...pics];
    updatedPics.splice(index, 1);
    setPics(updatedPics);
  };

  const gotoHome = () => {
    history.push("/");
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    history.push('/login');
  };

  return (
    <>
      <div>{greeting}, {userName || 'Guest'}</div>
      <Button onClick={onOpen}>Post something..!</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentPostId ? 'Edit Post' : 'Create Post'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div>
                <label>Content:</label>
                <textarea value={content} onChange={e => setContent(e.target.value)} />
              </div>
              <div>
                <label>Plot Area Value:</label>
                <input type="number" value={plotAreaValue} onChange={e => setPlotAreaValue(e.target.value)} />
                <select value={plotAreaUnit} onChange={e => setPlotAreaUnit(e.target.value)}>
                  <option value="yards">Yards</option>
                  <option value="meters">Meters</option>
                  <option value="acres">Acres</option>
                </select>
              </div>
              <div>
                <label>Plot Price:</label>
                <input type="number" value={plotPrice} onChange={e => setPlotPrice(e.target.value)} />
              </div>
              <div>
                <label>Plot Location:</label>
                <input type="text" value={plotLocation} onChange={e => setPlotLocation(e.target.value)} />
              </div>
              <div>
                <label>Pictures:</label>
                <input type="file" accept="image/*" multiple onChange={e => postDetails(e.target.files)} />
                {isPicLoading ? (
                  <div>Loading...</div>
                ) : (
                  pics && pics.map((pic, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img src={pic} alt={`Chosen ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      <Button
                        style={{ position: 'absolute', top: '5px', right: '5px' }}
                        onClick={() => handleRemovePic(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>
              <Button type="submit" colorScheme='blue' mr={3} isLoading={isLoading} loadingText="Submitting...">
                {currentPostId ? 'Update Post' : 'Create Post'}
              </Button>
              {currentPostId && <Button variant='ghost' onClick={onClose}>Cancel Edit</Button>}
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button onClick={gotoHome}>Home</Button>
      <Button onClick={handleLogout}>Logout</Button>

      {loadingPosts ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <>
          <h2>All Posts</h2>
          <ul>
            {posts.map(post => (
              <li key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p><strong>Plot Area:</strong> {post.plotArea.value} {post.plotArea.unit}</p>
                <p><strong>Plot Price:</strong> {post.plotPrice}</p>
                <p><strong>Plot Location:</strong> {post.plotLocation}</p>
                {post.pics && post.pics.map((pic, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img src={pic} alt={`Post ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </div>
                ))}
                <Button onClick={() => startEdit(post)}>Edit</Button>
                <Button onClick={() => deletePost(post)}>Delete</Button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default AdminPage;
