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
 *     tags: [Data Task-2, Task-4]
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

/**
 * @swagger
 * /api/v1/ethereum/balance/{address}:
 *   get:
 *     summary: Retrieve Ethereum account balance
 *     description: |
 *       Retrieve the balance of the specified Ethereum account.
 *       The account address must be a valid Ethereum address.
 *     tags:
 *       - Ethereum Task-5 
 *     parameters:
 *       - name: address
 *         in: path
 *         description: Ethereum account address
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Successful response with account balance
 *         schema:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *               description: Ethereum account address
 *             balance:
 *               type: string
 *               description: Account balance in Ether
 *       '400':
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message indicating the bad request
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message indicating the internal server error
 */

router.get('/ethereum/balance/:address', apiController.ethereumBalance);

module.exports = router;

