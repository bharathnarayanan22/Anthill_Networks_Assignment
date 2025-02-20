const Booking = require('../models/Booking');
const Bus = require('../models/Bus');

const bookBus = async (req, res) => {
    try {
        const { busId, seatNumber } = req.body;
        const userId = req.user.id;

        const bus = await Bus.findById(busId);
        if (!bus || bus.availableSeats < 1) return res.status(400).json({ message: 'No seats available' });

        const existingBooking = await Booking.findOne({ bus: busId, seatNumber });
        if (existingBooking) return res.status(400).json({ message: 'Seat already booked' });

        const booking = new Booking({ user: userId, bus: busId, seatNumber });
        await booking.save();

        bus.availableSeats -= 1;
        await bus.save();

        res.status(201).json({ message: 'Bus booked successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error booking bus', error });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId).populate('bus');

        if (!booking || booking.user.toString() !== req.user.id)
            return res.status(403).json({ message: 'Unauthorized or booking not found' });

        booking.status = 'cancelled';
        await booking.save();

        booking.bus.availableSeats += 1;
        await booking.bus.save();

        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await Booking.find({ user: userId }).populate('bus');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

module.exports = { bookBus, cancelBooking, getUserBookings };