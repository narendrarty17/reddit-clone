require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

console.log("mongodb url: ", process.env.DB_CONNECTION_STRING);

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err))

// Routes
const communityRoutes = require('./routes/community');
const uploadRoutes = require('./routes/upload');
const postRoutes = require('./routes/post');

app.use('/community', communityRoutes);
app.use('/upload', uploadRoutes);
app.use('/post', postRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
