const Route = require('../models/Route');

const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching routes', error });
    }
};

const addRoute = async (req, res) => {
    try {
        const { source, destination, stops } = req.body;
        const route = new Route({ source, destination, stops });
        await route.save();
        res.status(201).json({ message: 'Route added successfully', route });
    } catch (error) {
        res.status(500).json({ message: 'Error adding route', error });
    }
};

const updateRoute = async (req, res) => {
    try {
        const { routeId } = req.params;
        const updatedRoute = await Route.findByIdAndUpdate(routeId, req.body, { new: true });
        if (!updatedRoute) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json({ message: 'Route updated successfully', updatedRoute });
    } catch (error) {
        res.status(500).json({ message: 'Error updating route', error });
    }
};

module.exports = { getAllRoutes, addRoute, updateRoute };
