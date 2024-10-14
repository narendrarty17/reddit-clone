// routes/posts.js
const express = require('express');
const router = express.Router();
const { createPost, getPostById, getAllPosts } = require('../controllers/postController');

// Route to create a new post
router.post('/', createPost);

// Route to get post by id
router.post('/:id', getPostById);

// Route to get all the posts
router.get('/', getAllPosts);

module.exports = router;
