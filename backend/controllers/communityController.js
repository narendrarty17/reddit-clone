const CommunitySchema = require('../models/CommunitySchema');
const PostSchema = require('../models/PostSchema');
const cloudinary = require('../config/cloudinary');

const deleteAllCommunityPosts = async (communityName) => {
    try {
        const posts = await PostSchema.find({ communityName });

        if (posts.length === 0) {
            return true;
        }

        // Delete all posts with the specified communityName
        await PostSchema.deleteMany({ communityName });

        // Loop through all the posts and delete images from cloudinary if they exist
        posts.map(async (post) => {
            if (post.content.type === 'image') {
                const imgUrl = post.content.value;
                const publicId = imgUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
        });

        return true;
    } catch (error) {
        console.error("Error deleting the posts", error);
        return false;
    }
}

exports.getCommunityByName = async (req, res) => {
    const { name } = req.params;

    try {
        const community = await CommunitySchema.findOne({ name: name });

        if (community) {
            res.json(community);
        } else {
            res.status(400).json({ message: 'Community not found' });
        }
    } catch (err) {
        console.log("Error fetching community: ", err);
        res.status(500).json({ message: 'Error fetching community' });
    }
};

exports.getAllCommunities = async (req, res) => {
    try {
        const communities = await CommunitySchema.find();
        res.status(200).json(communities);
    } catch (err) {
        console.log('Error fetching communities:', err);
        res.status(500).json({ message: 'Error fetching communities' });
    }
};

exports.createCommunity = async (req, res) => {
    const { name, description, bannerImage, iconImage, selectedTopics, isMature, visibility } = req.body;

    if (!name || !description || !bannerImage || !iconImage || !selectedTopics || visibility === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const communityData = {
        name,
        description,
        bannerImage,
        iconImage,
        selectedTopics,
        isMature: isMature || false,
        visibility,
        date: new Date().toISOString(),
    };

    try {
        // Check if community name already exists
        const nameExists = await CommunitySchema.findOne({ name: name });
        if (nameExists) {
            return res.status(400).json({ message: 'Community name already exists' });
        }

        // Create a new community document
        const newCommunity = new CommunitySchema(communityData);
        await newCommunity.save();

        res.status(201).json({ message: 'Community saved successfully', community: newCommunity });
    } catch (err) {
        console.error('Error creating community', err);
        res.status(500).json({ message: 'Error creating community' });
    }
};

exports.deleteCommunity = async (req, res) => {
    const { communityName } = req.params;
    console.log('Community name as per as params: ', communityName);

    try {
        // Fetch the community to delete its images
        const community = await CommunitySchema.findOne({ name: communityName });
        if (!community) {
            console.log('community not found');
            return res.status(404).json({ message: `Community not found` });
        }

        const postsDeleted = await deleteAllCommunityPosts(communityName);
        if (!postsDeleted) {
            console.log("posts deleted successfully")
            return res.status(500).json({ message: `Error deleting posts associated with ${communityName}` });
        }

        // Delete bannerImage and iconImage stored in cloudinary
        const bannerPublicId = community.bannerImage.split('/').pop().split('.')[0];
        const iconPublicId = community.iconImage.split('/').pop().split('.')[0];

        // Deleting commuinty
        await CommunitySchema.findOneAndDelete({ name: communityName })

        await Promise.all([
            cloudinary.uploader.destroy(bannerPublicId),
            cloudinary.uploader.destroy(iconPublicId)
        ]);

        console.log('banner and logo deleted from cloudinary');

        res.status(200).json({ message: `${communityName} successfully deleted` });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: `Error deleting community` });
    }
}
