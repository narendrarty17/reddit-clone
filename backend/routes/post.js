// routes/posts.js
const express = require('express');
const router = express.Router();
const { createPost, getPostById, getAllPosts, deletePost, deletePostsByCommunity } = require('../controllers/postController');

// Route to create a new post
router.post('/', createPost);

// Route to get post by id
router.post('/:id', getPostById);

// Route to get all the posts
router.get('/', getAllPosts);

// Route to delete a post by id
router.delete('/:id', deletePost);

module.exports = router;
