const cloudinary = require('cloudinary').v2;

// configure cloudinary with your credentials
cloudinary.config({
    cloud_name: 'dcfw2vxom',
    api_key: '816293324592539',
    api_secret: '_BItGZ1uQDCxN_BzaPt7pfwauXs'
});

module.exports = cloudinary;