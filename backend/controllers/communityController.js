const CommunitySchema = require('../models/CommunitySchema');

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
