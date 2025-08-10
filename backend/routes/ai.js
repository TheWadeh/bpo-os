const express = require('express');
const router = express.Router();
const { getAiInsights } = require('../controllers/ai');
const { protect } = require('../middleware/auth');

router.route('/insights').post(protect, getAiInsights);

module.exports = router;
