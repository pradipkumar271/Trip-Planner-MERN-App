const express = require('express');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user.id });
        res.json(trips);
    } catch (err) {
        console.error('Fetch trips error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', auth, async (req, res) => {

    try {
        const { title, source, destination, startDate, endDate, budget, background, itinerary, activities } = req.body;

        const trip = new Trip({
            title,
            source,
            destination,
            dates: {
                start: startDate,
                end: endDate
            },
            budget,
            background,
            itinerary,
            activities,
            user: req.user.id
        });

        await trip.save();

        res.json(trip);
    } catch (err) {
        console.error('Add trip error:', err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }

        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;