const express = require('express');
const { getAllRoutes, addRoute, updateRoute } = require('../controllers/routeController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateUser, getAllRoutes);
router.post('/', authenticateUser, authorizeAdmin, addRoute);
router.put('/:routeId', authenticateUser, authorizeAdmin, updateRoute);

module.exports = router;