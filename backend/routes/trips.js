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
        if (!req.user?.id) {
            return res.status(401).json({ message: 'Unauthorized: user not found in token' });
        }

        const {
            title,
            source,
            destination,
            startDate,
            endDate,
            budget,
            background,
            itinerary,
            activities
        } = req.body;

        const normalizedTitle = String(title || '').trim();
        const normalizedSource = String(source || '').trim();
        const normalizedDestination = String(destination || '').trim();
        const normalizedStart = startDate || req.body?.dates?.start;
        const normalizedEnd = endDate || req.body?.dates?.end;

        const missingFields = [];
        if (!normalizedTitle) missingFields.push('title');
        if (!normalizedSource) missingFields.push('source');
        if (!normalizedDestination) missingFields.push('destination');
        if (!normalizedStart) missingFields.push('startDate');
        if (!normalizedEnd) missingFields.push('endDate');

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const parsedStart = new Date(normalizedStart);
        const parsedEnd = new Date(normalizedEnd);

        if (Number.isNaN(parsedStart.getTime()) || Number.isNaN(parsedEnd.getTime())) {
            return res.status(400).json({ message: 'Invalid date format for startDate or endDate' });
        }

        if (parsedEnd < parsedStart) {
            return res.status(400).json({ message: 'endDate cannot be earlier than startDate' });
        }

        const numericBudget = Number(budget);
        const normalizedBudget = Number.isFinite(numericBudget) && numericBudget >= 0 ? numericBudget : 0;

        const trip = new Trip({
            title: normalizedTitle,
            source: normalizedSource,
            destination: normalizedDestination,
            dates: {
                start: parsedStart,
                end: parsedEnd
            },
            budget: normalizedBudget,
            background: String(background || '').trim(),
            itinerary: String(itinerary || '').trim(),
            activities: Array.isArray(activities) ? activities : [],
            user: req.user.id
        });

        await trip.save();

        res.status(201).json(trip);
    } catch (err) {
        console.error('Add trip error:', err);

        if (err.name === 'ValidationError') {
            const fieldErrors = Object.values(err.errors || {}).map((fieldError) => fieldError.message);
            return res.status(400).json({ message: fieldErrors.join(', ') || err.message });
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