const express = require('express');
const router = express.Router();
const { emergency } = require('../controllers/emergencyController');

router.post('/emergency', emergency);

module.exports = router;



