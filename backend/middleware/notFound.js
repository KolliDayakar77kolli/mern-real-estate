const path = require('path');

const notFoundHandler = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../client/public', '404.html'));
};

module.exports = notFoundHandler;
