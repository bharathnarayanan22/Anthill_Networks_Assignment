const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/env'); 

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken };
