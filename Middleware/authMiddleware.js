const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

const userTokens = new Map();

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    token = token?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const username = decoded.username;

        if (!userTokens.has(username) || userTokens.get(username) !== token) {
            return res.status(401).json({ message: 'User logged out. Please log in again.' });
        }

        req.user = { username };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        } else {
            return res.status(400).json({ message: 'Invalid token.' });
        }
    }
};

module.exports = { verifyToken , userTokens};
