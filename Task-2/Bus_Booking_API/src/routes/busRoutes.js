const express = require('express');
const { getAllBuses, addBus, updateBus, deleteBus } = require('../controllers/busController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateUser, getAllBuses);
router.post('/', authenticateUser, authorizeAdmin, addBus);
router.put('/:busId', authenticateUser, authorizeAdmin, updateBus);
router.delete('/:busId', authenticateUser, authorizeAdmin, deleteBus);

module.exports = router;
