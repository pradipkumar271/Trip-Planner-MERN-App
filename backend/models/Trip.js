const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    dates: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
    },
    budget: { type: Number, default: 0 },
    background: { type: String, default: '' },
    itinerary: { type: String, default: '' },
    activities: [{
        name: String,
        date: Date,
        notes: String
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
