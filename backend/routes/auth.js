const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authController.login);
router.post('/resend-otp', authController.resendOtp);

// ==================== PROFILE ROUTES ====================

// GET profile with trip stats
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -otp -otpExpiry -otpResendCooldown');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const trips = await Trip.find({ user: req.user.id });
        const now = new Date();
        const totalBudget = trips.reduce((sum, t) => sum + Number(t.budget || 0), 0);
        const upcomingTrips = trips.filter(t => t.dates?.start && new Date(t.dates.start) > now).length;
        const pastTrips = trips.filter(t => t.dates?.end && new Date(t.dates.end) < now).length;

        res.json({
            user,
            stats: { totalTrips: trips.length, totalBudget, upcomingTrips, pastTrips }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT update profile (name, phone, bio)
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, phone, bio } = req.body;
        if (!name?.trim()) return res.status(400).json({ message: 'Name is required' });

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name: name.trim(), phone: (phone || '').trim(), bio: (bio || '').trim() },
            { new: true }
        ).select('-password -otp -otpExpiry -otpResendCooldown');

        res.json({ message: 'Profile updated', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT change password
router.put('/change-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword)
            return res.status(400).json({ message: 'Both current and new password are required' });
        if (newPassword.length < 6)
            return res.status(400).json({ message: 'New password must be at least 6 characters' });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;