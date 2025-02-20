const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
    source: { type: String, required: true },
    destination: { type: String, required: true },
    stops: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Route', RouteSchema);