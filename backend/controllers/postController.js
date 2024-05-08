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

module.exports = { createPost, allPosts };
