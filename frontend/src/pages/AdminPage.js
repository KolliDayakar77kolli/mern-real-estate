import React, { useState, useEffect} from 'react';
import axios from 'axios';

const AdminPage = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [posts, setPosts] = useState([]); // State to store the list of posts

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
  
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:5000/api/posts/createPost', { title, content });
          console.log(res.data);
          alert('Post created!');
          setTitle(''); 
          setContent('');
        } catch (error) {
          console.error(error.response?.data?.error || error.message);
          alert('Failed to create post: ' + (error.response?.data?.error || error.message));
        }
    };
    
  return (
    <div>
      AdminPage
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

      <hr/>
      <hr/>
      <hr/>
      <hr/>
      <hr/>
      <hr/>
      <hr/>
      <hr/>


      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button>Edit</button>
            <br/>
            <button>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default AdminPage