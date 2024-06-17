// middlewares/notFound.js

const path = require('path');

// Middleware to handle 404 errors
const notFoundHandler = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../client/public', '404.html'));
};

module.exports = notFoundHandler;
