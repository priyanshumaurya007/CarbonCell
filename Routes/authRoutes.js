const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const authMiddleware = require('../Middleware/authMiddleware')

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/logout', authMiddleware.verifyToken, authController.logoutUser);

router.get('/protected',authMiddleware.verifyToken, authController.protectedRoute);

module.exports = router;
