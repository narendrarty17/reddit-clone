const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');


// Initialize Express app
const app = express();
const port = 5000;

// Middleware to parse incoming requests with JSON payloads
app.use(cors());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(500).json({ message: err.message });
    } else if (err) {
        // An unknown error occurred
        return res.status(500).json({ message: 'An error occurred while processing the file' });
    }
    next();
});

// Function to ensure the directory exists
const ensureDirectoryExistence = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Ensure the uploads directory exists
ensureDirectoryExistence('uploads/');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // Specify the directory where files should be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Naming convention for uploaded files
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit to 2MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;   // Acceptable file types
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File type not supported'));
    }
});

// Route to receive a banner image
app.post('/upload/banner', upload.single('bannerImage'), (req, res) => {
    // Handle any multer errors
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }

    if (!req.file) {
        return res.status(400).json({ mesage: 'No file uploaded' });
    }

    const bannerImagePath = req.file ? req.file.path : null;

    // Send the file path back as a response
    res.status(200).json({
        path: bannerImagePath
    });
});

// Route to receive an icon image
app.post('/upload/icon', upload.single('iconImage'), (req, res) => {
    // Handle any multer errors
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const iconImagePath = req.file ? req.file.path : null;

    // Send the file path back as a response
    res.status(200).json({
        path: iconImagePath,
    });
});

// Route to receive community data
app.post('/community', async (req, res) => {
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
        // Read the file asynchronously
        let data = await fs.promises.readFile(filePath, 'utf8');
        let communities = data ? JSON.parse(data) : [];

        // Check if community name already exists
        const nameExists = communities.some(community => community.name.trim().toLowerCase() === name.trim().toLowerCase());

        if (nameExists) {
            return res.status(400).json({ message: 'Community name already exists' });
        }

        // Add the new community and save
        communities.push(communityData);

        // Write the file synchronously
        await fs.promises.writeFile(filePath, JSON.stringify(communities, null, 2));

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
