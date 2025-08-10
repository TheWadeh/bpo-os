const express = require('express');
const router = express.Router();
const { getClients, getClient, createClient, updateClient, deleteClient } = require('../controllers/clients');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getClients).post(protect, createClient);
router.route('/:id').get(protect, getClient).put(protect, updateClient).delete(protect, deleteClient);

module.exports = router;
