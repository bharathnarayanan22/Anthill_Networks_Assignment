const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
