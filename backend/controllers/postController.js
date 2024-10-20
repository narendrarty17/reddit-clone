// controllers/postController.js
const PostSchema = require('../models/PostSchema');
const cloudinary = require('../config/cloudinary.js');

// Controller function to create a new post
const createPost = async (req, res) => {
    const { communityName, title, content, googleId } = req.body;

    if (!communityName || !title || !content || !googleId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newPost = new PostSchema({
            communityName,
            title,
            content,
            googleId
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

// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id; // Get post ID from request parameters

        // Find the post
        const post = await PostSchema.findById(postId);
        if (!post) {
            return res.status(400).json({ message: 'Post not found' });
        }

        const imageUrl = post.content.type === 'image' ? post.content.value : null;

        // Delete the post from database
        await PostSchema.findByIdAndDelete(postId);

        if (imageUrl) {
            // Extract the cloudinary image public Id
            const publicId = imageUrl.split('/').pop().split('.')[0]; // Extracting public id

            // Delete image from cloudinary
            await cloudinary.uploader.destroy(publicId);
        }

        res.status(200).json({ message: 'Post and image has been successfully deleted' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
};

// Update vote count
const updateVoteCount = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, action } = req.query;

        let updateQuery;

        if (type === 'upvote') {
            updateQuery = action === 'increase' ? { $inc: { upvote: 1 } } : { $inc: { upvote: -1 } };
        } else if (type === 'downvote') {
            updateQuery = action === 'increase' ? { inc: { downvote: 1 } } : { $inc: { downvote: -1 } };
        }

        const post = await PostSchema.findByIdAndUpdate(
            id,
            updateQuery,
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post)

    } catch (error) {
        console.error("Error occured while updating the vote count: ", error);
        res.status(500).json({ message: "Error occured while updating the vote count" });
    }
}

const getPostsByGoogleId = async (req, res) => {
    try {
        const { googleId } = req.body; // Extract userEmail from the request body
        console.log("Received user email in the server: ", googleId);
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = 10; // Limit to 10 posts per page
        const skip = (page - 1) * limit; // Calculate how many posts to skip based on the page

        // Validate if userEmail is provided in the request body
        if (!getPostsByGoogleId) {
            return res.status(400).json({ message: 'userEmail is required' });
        }

        // Fetch the total number of posts for the user
        const totalPosts = await PostSchema.countDocuments({ googleId });

        // Calculate total pages
        const totalPages = Math.ceil(totalPosts / limit);

        // Fetch posts associated with the userEmail with pagination
        const posts = await PostSchema.find({ googleId })
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip) // Skip the calculated number of posts
            .limit(limit); // Limit the number of posts

        // If no posts are found, return a 404 response
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user.' });
        }

        // Send the paginated posts and pagination details in the response
        res.status(200).json({
            posts,
            currentPage: page,
            totalPages,
            totalPosts,
        });
    } catch (error) {
        console.error("Error occurred while fetching user posts: ", error);
        res.status(500).json({ message: 'Error fetching user posts' });
    }
};

module.exports = { createPost, getPostById, getAllPosts, deletePost, updateVoteCount, getPostsByGoogleId };