const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../utils/fileUtils').upload;

// Route to receive a banner image
router.post('/banner', upload.single('bannerImage'), uploadController.uploadBanner);

// Route to receive an icon image
router.post('/icon', upload.single('iconImage'), uploadController.uploadIcon);

module.exports = router;
