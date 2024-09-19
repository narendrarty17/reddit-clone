const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


// Initialize Express app
const app = express();
const port = 5000;

// Middleware to parse incoming requests with JSON payloads
app.use(cors());
app.use(bodyParser.json());

// Route to receive community data
app.post('/community', (req, res) => {
    const { name, description, bannerImage, iconImage, selectedTopics, isMature, visibility } = req.body;

    // Simple validation
    if (!name || !description || !bannerImage || !iconImage || !selectedTopics || visibility === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const communityData = {
        name,
        description,
        bannerImage,
        iconImage,
        selectedTopics,
        isMature: isMature || false,  // Default to false if not provided
        visibility,
        date: new Date().toISOString(),
    };

    // Path to the community data file
    const filePath = path.join(__dirname, 'community-data.json');

    try {
        // Read the file synchronously
        let data = fs.readFileSync(filePath, 'utf8');
        let communities = data ? JSON.parse(data) : [];

        // Check if community name already exists
        const nameExists = communities.some(community => community.name.trim().toLowerCase() === name.trim().toLowerCase());

        if (nameExists) {
            return res.status(400).json({ message: 'Community name already exists' });
        }

        // Add the new community and save
        communities.push(communityData);

        // Write the file synchronously
        fs.writeFileSync(filePath, JSON.stringify(communities, null, 2));

        res.status(200).json({ message: 'Community saved successfully' });
    } catch (err) {
        console.error('Error processing file:', err);
        res.status(500).json({ message: 'Error processing file' });
    }
});

// Route to fetch all community data
app.get('/communities', (req, res) => {
    const filePath = path.join(__dirname, 'community-data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }

        // Parse the JSON data and send it as a response
        const communities = data ? JSON.parse(data) : [];
        res.status(200).json(communities);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
