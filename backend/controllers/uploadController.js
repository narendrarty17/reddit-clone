const cloudinary = require('../utils/cloudinary');

exports.uploadBanner = (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const bannerImagePath = req.file.path;

    res.status(200).json({ path: bannerImagePath });
};

exports.uploadIcon = (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const iconImagePath = req.file.path;

    res.status(200).json({ path: iconImagePath });
};
