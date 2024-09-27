const multer = require('multer');

module.exports = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: err.message });
    } else if (err) {
        return res.status(500).json({ message: 'An error occurred while processing the request' });
    }
    next();
};
