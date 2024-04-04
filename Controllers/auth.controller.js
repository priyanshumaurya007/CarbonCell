const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { userTokens } = require('../Middleware/auth.middleware');
const UserDTO = require('../RequestPayload/user-request.payload');

const secretKey = process.env.SECRET_KEY || 'my_secret_key';
const userMap = new Map();

const registerUser = async (req, res) => {
    try {
        const userRequestPayload = UserDTO.fromRequest(req);

        if (!userRequestPayload.isValid()) {
            return res.status(400).json({ message: 'Name, Username, and Password are required.' });
        }

        if (userMap.has(userRequestPayload.username)) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        const user = new User(userRequestPayload.name, userRequestPayload.username, userRequestPayload.password);
        await user.hashPassword();

        userMap.set(userRequestPayload.username, user);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ message: 'Username, and Password are required.' });
        }

        const user = userMap.get(username);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '5m' });
        userTokens.set(username, token);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { username } = req.user;

        userTokens.delete(username);
        res.status(200).json({ message: 'User logged out successfully.' });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const protectedRoute = (req, res) => {
    res.status(200).json({ message: 'Protected route accessed successfully.' });
};

module.exports = { registerUser, loginUser, logoutUser, protectedRoute };
