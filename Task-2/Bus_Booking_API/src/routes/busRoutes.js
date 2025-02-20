const express = require('express');
const { getAllBuses, addBus, updateBus } = require('../controllers/busController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateUser, getAllBuses);
router.post('/', authenticateUser, authorizeAdmin, addBus);
router.put('/:busId', authenticateUser, authorizeAdmin, updateBus);

module.exports = router;
