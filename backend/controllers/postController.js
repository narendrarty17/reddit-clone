// controllers/postController.js
const PostSchema = require('../models/PostSchema');

// Controller function to create a new post
const createPost = async (req, res) => {
    const { communityName, title, content } = req.body;

    if (!communityName || !title || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newPost = new PostSchema({
            communityName,
            title,
            content,
        });

        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post' });
    }
};

// Get a post by ID
const getPostById = async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post); // Send the post data as a response
    } catch (error) {
        console.error('Error fetching post: ', error);
        res.status(500).json({ message: 'Error fetching post' });
    }
}

// Get all posts with pagination (newest posts first)
const getAllPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page is specified
    const limit = 10; // Number of posts per page
    const skip = (page - 1) * limit; // Calculate how many posts to skip based on the current page

    const communityName = req.query.communityName; // Get communityName from query parameters

    try {
        // Create a filter object for the MongoDB query
        const filter = communityName ? { communityName } : {}; // Filter by communityName if provided

        // Fetch the total number of posts based on the filter
        const totalPosts = await PostSchema.countDocuments(filter);

        // Fetch posts for the current page with limit and skip, sorted by newest first
        const posts = await PostSchema.find(filter)
            .sort({ createdAt: -1 }) // Newest posts first
            .skip(skip)
            .limit(limit); // Limit to 10 posts

        const totalPages = Math.ceil(totalPosts / limit); // Calculate total pages

        res.status(200).json({
            posts,
            currentPage: page,
            totalPages,
            totalPosts,
        });
    } catch (error) {
        console.error('Error fetching posts: ', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

module.exports = { createPost, getPostById, getAllPosts };