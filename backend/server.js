const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling for Multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: err.message });
    } else if (err) {
        return res.status(500).json({ message: 'An error occurred while processing the file' });
    }
    next();
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request made to: ${req.url}`);
    next();
});

// Utility Functions
const ensureDirectoryExistence = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const ensureFileExistence = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    }
};

const updateImagePaths = (data) => {
    return data.map(community => ({
        ...community,
        bannerImage: `http://localhost:${port}/uploads/${path.basename(community.bannerImage)}`,
        iconImage: `http://localhost:${port}/uploads/${path.basename(community.iconImage)}`,
    }));
};

const getCommunityData = async () => {
    try {
        const data = fs.readFileSync(communityDataFilePath);
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading community data:', err);
        return [];
    }
};

// Ensure directories and files exist
const uploadsDir = 'uploads/';
const communityDataFilePath = path.join(__dirname, 'community-data.json');
ensureDirectoryExistence(uploadsDir);
ensureFileExistence(communityDataFilePath);

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        cb(mimetype && extname ? null : new Error('Error: File type not supported'));
    }
});

// Routes
app.get('/community/:name', async (req, res) => {
    const { name } = req.params;
    const communities = await getCommunityData();
    const community = communities.find(community => community.name.toLowerCase() === name.toLowerCase());

    if (community) {
        res.json(community);
    } else {
        res.status(404).json({ message: 'Community not found' });
    }
});

app.get('/communities', (req, res) => {
    fs.readFile(communityDataFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading data' });
        const communities = updateImagePaths(JSON.parse(data));
        res.status(200).json(communities);
    });
});

app.get('/communities/navigation', (req, res) => {
    fs.readFile(communityDataFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading data' });
        const communities = updateImagePaths(JSON.parse(data));
        const navigationData = communities.map(({ name, iconImage }) => ({ name, iconImage }));
        res.status(200).json(navigationData);
    });
});

app.post('/upload/banner', upload.single('bannerImage'), (req, res) => {
    if (req.fileValidationError) return res.status(400).json({ message: req.fileValidationError });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    res.status(200).json({ path: req.file.path });
});

app.post('/upload/icon', upload.single('iconImage'), (req, res) => {
    if (req.fileValidationError) return res.status(400).json({ message: req.fileValidationError });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    res.status(200).json({ path: req.file.path });
});

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
        isMature: isMature || false,
        visibility,
        date: new Date().toISOString(),
    };

    try {
        let data = await fs.promises.readFile(communityDataFilePath, 'utf8');
        let communities = data ? JSON.parse(data) : [];
        const nameExists = communities.some(community => community.name.trim().toLowerCase() === name.trim().toLowerCase());

        if (nameExists) return res.status(400).json({ message: 'Community name already exists' });

        communities.push(communityData);
        await fs.promises.writeFile(communityDataFilePath, JSON.stringify(communities, null, 2));
        res.status(200).json({ message: 'Community saved successfully' });
    } catch (err) {
        console.error('Error processing file:', err);
        res.status(500).json({ message: 'Error processing file' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
