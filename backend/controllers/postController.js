const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

const createPost = asyncHandler(async (req, res) => {
  const { title, content, plotArea, plotPrice, plotLocation, pics } = req.body;

  if (!title || !content || !plotArea || !plotPrice || !plotLocation || !pics || !Array.isArray(pics)) {
    res.status(400);
    throw new Error("Please enter all the fields and provide pics as an array");
  }

  const newPost = new Post({ title, content, plotArea, plotPrice, plotLocation, pics });

  try {
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

const editPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, plotArea, plotPrice, plotLocation, pics } = req.body;

  if (!title || !content || !plotArea || !plotPrice || !plotLocation || !pics || !Array.isArray(pics)) {
    res.status(400);
    throw new Error("Please enter all the fields and provide pics as an array");
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, plotArea, plotPrice, plotLocation, pics },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      res.status(404);
      throw new Error("Post not found");
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

const allPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = { createPost, editPost, allPosts, deletePost };
