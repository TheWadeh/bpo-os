const express = require('express');
const router = express.Router();
const { getLeads, getLead, createLead, updateLead, deleteLead } = require('../controllers/leads');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getLeads).post(protect, createLead);
router.route('/:id').get(protect, getLead).put(protect, updateLead).delete(protect, deleteLead);

module.exports = router;
