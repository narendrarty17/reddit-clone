const fs = require('fs');
const path = require('path');

const communityDataFilePath = path.join(__dirname, '../community-data.json');

exports.getCommunityByName = async (req, res) => {
    const { name } = req.params;
    const communities = await getCommunityData();

    const community = communities.find(community => community.name.toLowerCase() === name.toLowerCase());

    if (community) {
        res.json(community);
    } else {
        res.status(404).json({ message: 'Community not found' });
    }
};

exports.getAllCommunities = (req, res) => {
    fs.readFile(communityDataFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading data' });
        let communities = JSON.parse(data);
        res.status(200).json(communities);
    });
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
        let data = await fs.promises.readFile(communityDataFilePath, 'utf8');
        let communities = data ? JSON.parse(data) : [];

        const nameExists = communities.some(community => community.name.trim().toLowerCase() === name.trim().toLowerCase());

        if (nameExists) {
            return res.status(400).json({ message: 'Community name already exists' });
        }

        communities.push(communityData);
        await fs.promises.writeFile(communityDataFilePath, JSON.stringify(communities, null, 2));

        res.status(200).json({ message: 'Community saved successfully' });
    } catch (err) {
        console.error('Error processing file:', err);
        res.status(500).json({ message: 'Error processing file' });
    }
};

async function getCommunityData() {
    try {
        const data = await fs.promises.readFile(communityDataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading community data:', err);
        return [];
    }
}
