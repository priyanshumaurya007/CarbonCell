const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const authMiddleware = require('../Middleware/authMiddleware')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /auth/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided username and password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.post('/user/register', authController.registerUser);

/**
 * @swagger
 * /auth/user/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate and login the user with the provided username and password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       '200':
 *         description: Login successful, returns JWT token which expires after 5 minutes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       '401':
 *         description: Invalid credentials
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

router.post('/user/login', authController.loginUser);

/**
 * @swagger
 * /auth/user/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout the currently logged-in user.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '401':
 *         description: Error message related to access denied
 *       '500':
 *         description: Internal server error
 */

router.post('/user/logout', authMiddleware.verifyToken, authController.logoutUser);

/**
 * @swagger
 * /auth/protected:
 *   get:
 *     summary: Protected route
 *     description: Access a protected route that requires authentication.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Protected route accessed successfully
 *       '401':
 *         description: Error message related to access denied
 *       '500':
 *         description: Internal server error
 */

router.get('/protected',authMiddleware.verifyToken, authController.protectedRoute);

module.exports = router;
