const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwtUtils');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        await RefreshToken.create({ user: user._id, token: refreshToken });

        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        const storedToken = await RefreshToken.findOne({ token });
        if (!storedToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(storedToken.user);

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        const deletedToken = await RefreshToken.findOneAndDelete({ token });

        if (!deletedToken) {
            return res.status(404).json({ message: 'Invalid refresh token' });
        }

        res.json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ message: 'Server error during logout' });
    }
};

module.exports = { registerUser, loginUser, refreshToken, logoutUser };
