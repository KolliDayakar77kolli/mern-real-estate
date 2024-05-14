import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import { Button } from '@chakra-ui/react';

function Homepage() {
  const [posts, setPosts] = useState([]); // State to store the list of posts
  const history = useHistory();

  const handleAdminLogin = () => {
    history.push('/login'); // Redirect to /admin route
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data); // Set the fetched posts to state
      } catch (error) {
        console.error('Failed to fetch posts:', error.response?.data?.error || error.message);
        alert('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <div className="Homepage">
      <Button onClick={handleAdminLogin}>Admin Login</Button>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
