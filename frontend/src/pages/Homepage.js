import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import { Button , Box, Text, UnorderedList, ListItem} from '@chakra-ui/react';

function Homepage() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const handleAdminLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
        alert('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="Homepage">
      <Button onClick={handleAdminLogin}>Admin Login</Button>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><strong>Plot Area:</strong> {post.plotArea.value} {post.plotArea.unit}</p>
            <p><strong>Plot Price:</strong> {post.plotPrice}</p>
            <p><strong>Plot Location:</strong> {post.plotLocation}</p>
            <Box style={{ marginLeft: '20px' }}>
                  <Text fontWeight="bold">Highlights:</Text>
                  <UnorderedList>
                    {post.highlights.map((highlight, index) => (
                      <ListItem key={index}>{highlight}</ListItem>
                    ))}
                  </UnorderedList>
                </Box>
            {post.pics && post.pics.map((pic, index) => (
              <img key={index} src={pic} alt={`Post Pic ${index}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
