const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' }
}, { timestamps: true });

module.exports = mongoose.model('Bus', BusSchema);