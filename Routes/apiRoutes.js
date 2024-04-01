const express = require('express');
const router = express.Router();
const apiController = require('../Controllers/apiController');

router.get('/data/retrieve', apiController.fetchData);

module.exports = router;

