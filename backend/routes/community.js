const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// Route to get community by name
router.get('/:name', communityController.getCommunityByName);

// Route to fetch full community data
router.get('/', communityController.getAllCommunities);

// Route to receive community data
router.post('/', communityController.createCommunity);

module.exports = router;