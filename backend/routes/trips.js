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

router.put('/:id', auth, async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            {
                title: req.body.title,
                source: req.body.source,
                destination: req.body.destination,
                dates: {
                    start: req.body.startDate || req.body.dates?.start,
                    end: req.body.endDate || req.body.dates?.end
                },
                budget: req.body.budget,
                background: req.body.background,
                itinerary: req.body.itinerary,
                activities: req.body.activities || []
            },
            { new: true, runValidators: true }
        );

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.json(trip);
    } catch (err) {
        console.error('Update trip error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.json({ message: 'Trip deleted' });
    } catch (err) {
        console.error('Delete trip error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;