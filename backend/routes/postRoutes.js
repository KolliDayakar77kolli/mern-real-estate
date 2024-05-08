const express = require('express');
const router = express.Router();
const { createPost, allPosts} = require('../controllers/postController');

router.post('/createPost', createPost);
router.get('/', allPosts);


module.exports = router;