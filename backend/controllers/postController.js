const asyncHandler = require("express-async-handler");
const Post = require('../models/postModel');

// Function to create a new post
const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const newPost = new Post({ title, content });

    try {
        await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Function to get all posts from the database
const allPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find(); // Retrieve all posts from the Post collection
        res.status(200).json(posts);     // Respond with the retrieved posts and a 200 OK status
    } catch (error) {
        res.status(500).json({ success: false, error: error.message }); // Handle any errors
    }
});

const editPost = asyncHandler(async (req, res) => {
    const { id } = req.params;    // Get post ID from URL parameters
    const { title, content } = req.body;  // Get updated title and content from request body

    // Check if all required fields are provided
    if (!title || !content) {
        res.status(400);
        throw new Error("Both title and content are required");
    }

    // Find the post by ID and update it
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true, runValidators: true });

    if (!updatedPost) {
        res.status(404);
        throw new Error("Post not found");
    }

    res.status(200).json(updatedPost);
});

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        // Find the post by ID and delete it
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createPost, allPosts , editPost, deletePost};
