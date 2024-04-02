const express = require('express');
const router = express.Router();
const apiController = require('../Controllers/apiController');
const authMiddleware = require('../Middleware/authMiddleware')

/**
 * @swagger
 * /api/v1/data/retrieve:
 *   get:
 *     summary: Fetch data from a public API
 *     description: Fetch data from a public API with optional filtering options, requiring authentication.
 *     tags: [Data]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter data by category
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Limit the number of results
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with data from the public API
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   API:
 *                     type: string
 *                     description: The name of the API
 *                   Description:
 *                     type: string
 *                     description: Description of the API
 *                   Auth:
 *                     type: string
 *                     description: Authentication method required
 *                   HTTPS:
 *                     type: boolean
 *                     description: Whether the API requires HTTPS
 *                   Cors:
 *                     type: string
 *                     description: Cross-Origin Resource Sharing (CORS) policy
 *                   Link:
 *                     type: string
 *                     description: URL to the API documentation or homepage
 *                   Category:
 *                     type: string
 *                     description: Category of the API
 *       '400':
 *         description: Bad request sent to the public API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the bad request
 *       '401':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   description: Error message indicating unauthorized access
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the internal server error
 */

router.get('/data/retrieve', authMiddleware.verifyToken, apiController.fetchData);

module.exports = router;

