const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { userTokens } = require('../Middleware/authMiddleware');
const UserDTO = require('../RequestPayload/user-request.payload');

const secretKey = 'your_secret_key';
const userMap = new Map();

const registerUser = async (req, res) => {
    try {
        const userRequestPayload = UserDTO.fromRequest(req);

        if (!userRequestPayload.isValid()) {
            return res.status(400).json({ message: 'Name, Username and password are required.' });
        }

        if (userMap.has(userRequestPayload?.username)) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        const user = new User(userRequestPayload?.name, userRequestPayload?.username, userRequestPayload?.password);
        await user.hashPassword();

        userMap.set(userRequestPayload?.username, user);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

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
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const logoutUser = async (req, res) => {

    const { username } = req.user;

    userTokens.delete(username); 
    res.status(200).json({ message: 'User logged out successfully.' });
};

const protectedRoute = (req, res) => {
    res.status(200).json({ message: 'Protected route accessed successfully.' });
};

module.exports = { registerUser, loginUser, logoutUser, protectedRoute };
