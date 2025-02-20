const Bus = require('../models/Bus');

const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find().populate('route');
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching buses', error });
    }
};

const addBus = async (req, res) => {
    try {
        const { name, number, capacity, availableSeats, route } = req.body;
        const bus = new Bus({ name, number, capacity, availableSeats, route });
        await bus.save();
        res.status(201).json({ message: 'Bus added successfully', bus });
    } catch (error) {
        res.status(500).json({ message: 'Error adding bus', error });
    }
};

const updateBus = async (req, res) => {
    try {
        const { busId } = req.params;
        const updatedBus = await Bus.findByIdAndUpdate(busId, req.body, { new: true });
        if (!updatedBus) return res.status(404).json({ message: 'Bus not found' });
        res.status(200).json({ message: 'Bus updated successfully', updatedBus });
    } catch (error) {
        res.status(500).json({ message: 'Error updating bus', error });
    }
};

module.exports = { getAllBuses, addBus, updateBus };
