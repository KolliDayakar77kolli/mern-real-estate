import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentPostId, setCurrentPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content };
    setIsLoading(true); // Set loading state to true
    try {
      let response;
      if (currentPostId) {
        response = await axios.put(`http://localhost:5000/api/posts/${currentPostId}`, postData);
      } else {
        response = await axios.post('http://localhost:5000/api/posts', postData);
      }
      console.log(response.data);
      setTitle('');
      setContent('');
      setCurrentPostId(null);
      setIsLoading(false); // Set loading state to false
      alert(`Post ${currentPostId ? 'updated' : 'created'} successfully!`);
      const updatedPosts = posts.map(post => post._id === currentPostId ? response.data : post);
      setPosts(currentPostId ? updatedPosts : [...posts, response.data]);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      alert('Failed to ' + (currentPostId ? 'update' : 'create') + ' post: ' + (error.response?.data?.error || error.message));
      setIsLoading(false); // Set loading state to false in case of error
    }
  };

  const startEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
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

  return (
    <>
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
              <Button type="submit" colorScheme='blue' mr={3} isLoading={isLoading} loadingText="Submitting..." spinner={<BeatLoader size={8} color='white' />}>
                {currentPostId ? 'Update Post' : 'Create Post'}
              </Button>
              {currentPostId && <Button variant='ghost' onClick={onClose}>Cancel Edit</Button>}
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Button onClick={() => startEdit(post)}>Edit</Button>
            <Button onClick={() => deletePost(post)}>Delete</Button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AdminPage;