const express = require('express');
const router = express.Router();

const { createPost, allPosts, editPost, deletePost, getPostsByType} = require('../controllers/postController');

router.post('/', createPost);
router.get('/', allPosts);   
router.put('/:id', editPost);
router.delete('/:id', deletePost);
router.get("/type", getPostsByType);

module.exports = router;