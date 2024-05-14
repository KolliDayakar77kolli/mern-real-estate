import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [currentPostId, setCurrentPostId] = useState(null); // null when creating, set to ID when editing

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

        try {
            let response;
            if (currentPostId) {
                // Update the existing post
                response = await axios.put(`http://localhost:5000/api/posts/${currentPostId}`, postData);
            } else {
                // Create a new post
                response = await axios.post('http://localhost:5000/api/posts', postData);
            }
            console.log(response.data);

            // Reset form
            setTitle('');
            setContent('');
            setCurrentPostId(null);
            alert(`Post ${currentPostId ? 'updated' : 'created'} successfully!`);

            // Update local posts state
            if (currentPostId) {
                setPosts(posts.map(post => post._id === currentPostId ? response.data : post));
            } else {
                setPosts([...posts, response.data]);
            }
        } catch (error) {
            console.error(error.response?.data?.error || error.message);
            alert('Failed to ' + (currentPostId ? 'update' : 'create') + ' post: ' + (error.response?.data?.error || error.message));
        }
    };

    const startEdit = (post) => {
        setTitle(post.title);
        setContent(post.content);
        setCurrentPostId(post._id);
    };

    const deletePost = async (post) => {
        // Display a confirmation dialog before deleting
        const isConfirmed = window.confirm('Are you sure you want to delete this post?');
        if (!isConfirmed) {
            return; // If user cancels, exit early
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
            console.log(response.data);
            // Remove the deleted post from the local state
            setPosts(posts.filter(p => p._id !== post._id));
            alert('Post deleted successfully!');
        } catch (error) {
            console.error('Failed to delete post:', error.response?.data?.error || error.message);
            alert('Failed to delete post: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div>
            <h1>{currentPostId ? 'Edit Post' : 'Create Post'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} />
                </div>
                <button type="submit">{currentPostId ? 'Update Post' : 'Create Post'}</button>
                {currentPostId && <button onClick={() => { setTitle(''); setContent(''); setCurrentPostId(null); }}>Cancel Edit</button>}
            </form>

            <h2>All Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button onClick={() => startEdit(post)}>Edit</button>
                        <button onClick={() => deletePost(post)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPage;
