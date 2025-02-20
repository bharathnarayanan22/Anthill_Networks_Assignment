const express = require('express');
const { bookBus, cancelBooking, getUserBookings } = require('../controllers/bookingController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/book', authenticateUser, bookBus);
router.post('/cancel/:bookingId', authenticateUser, cancelBooking);
router.get('/', authenticateUser, getUserBookings);

module.exports = router;