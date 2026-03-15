const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');
const { generateOTP, sendOTPEmail } = require('../utils/emailService');

const router = express.Router();
const JWT_SECRET = process.env.JWTSECRET || 'secretkey';

// ==================== REGISTRATION WITH OTP ====================

// Step 1: Send OTP during registration
router.post('/register/send-otp', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        let user = await User.findOne({ email: String(email) });

        if (user && user.isVerified) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password first so `hash` is available below
        const hash = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // If user exists but not verified, update; otherwise create new
        if (user) {
            user.name = name;
            user.password = hash;
            user.otp = otp;
            user.otpExpires = otpExpires;
            user.tempData = { name, password: hash };
            await user.save();
        } else {
            user = new User({
                name,
                email,
                password: hash,
                otp,
                otpExpires,
                isVerified: false,
                tempData: { name, password: hash }
            });
            await user.save();
        }

        // Send OTP to email
        await sendOTPEmail(email, otp, name);

        res.json({
            message: 'OTP sent to your email',
            email: email
        });

    } catch (err) {
        console.error('❌ Register send OTP error:', err.message);
        console.error('Full error:', err);

        // Return more specific error message for debugging
        const errorMsg = err.message || 'Failed to send OTP. Please try again.';
        res.status(500).json({ message: errorMsg });
    }
});

// Step 2: Verify OTP during registration
router.post('/register/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const user = await User.findOne({ email: String(email) });



        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check OTP expiration
        if (new Date() > user.otpExpires) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Verify OTP
        if (String(user.otp) !== String(otp)) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }


        // Mark user as verified
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        user.tempData = null;
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET)


        res.json({
            message: 'Registration successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error('Register verify OTP error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== LOGIN WITH OTP ====================

// Step 1: Send OTP during login
router.post('/login/send-otp', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: String(email) });


        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please verify your email first' });
        }

        // Generate OTP and save both otp + expiry together
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        await user.save();

        // Send OTP to email
        await sendOTPEmail(email, otp, user.name);

        res.json({
            message: 'OTP sent to your email',
            email: email
        });

    } catch (err) {
        console.error('❌ Login send OTP error:', err.message);
        console.error('Full error:', err);

        // Return more specific error message for debugging
        const errorMsg = err.message || 'Failed to send OTP. Please try again.';
        res.status(500).json({ message: errorMsg });
    }
});

// Step 2: Verify OTP during login
router.post('/login/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const user = await User.findOne({ email: String(email) });


        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check OTP expiration
        if (new Date() > user.otpExpires) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Verify OTP
        if (String(user.otp) !== String(otp)) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }


        // Clear OTP
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET)


        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error('Login verify OTP error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== RESEND OTP ENDPOINTS ====================

// Resend OTP for registration
router.post('/register/resend-otp', async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: String(email) });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check cooldown (30 seconds)
        const now = new Date();
        if (user.otpResendCooldown && now < user.otpResendCooldown) {
            const secondsLeft = Math.ceil((user.otpResendCooldown - now) / 1000);
            return res.status(429).json({
                message: `Please wait ${secondsLeft} seconds before requesting another OTP`,
                waitTime: secondsLeft
            });
        }

        // Generate new OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        const resendCooldown = new Date(Date.now() + 30 * 1000); // 30 seconds

        console.log(`\n📧 OTP Resent for ${email}`);
        console.log(`OTP Code: ${otp}`);
        console.log(`Expires at: ${otpExpires}\n`);

        user.otp = otp;
        user.otpExpires = otpExpires;
        user.otpResendCooldown = resendCooldown;
        await user.save();

        // Send OTP to email
        await sendOTPEmail(email, otp, user.name || 'User');

        res.json({
            message: 'OTP resent successfully',
            email: email,
            expiresIn: 300 // 5 minutes in seconds
        });

    } catch (err) {
        console.error('❌ Resend OTP error:', err.message);
        res.status(500).json({ message: 'Failed to resend OTP. Please try again.' });
    }
});

// Resend OTP for login
router.post('/login/resend-otp', async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: String(email) });


        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check cooldown (30 seconds)
        const now = new Date();
        if (user.otpResendCooldown && now < user.otpResendCooldown) {
            const secondsLeft = Math.ceil((user.otpResendCooldown - now) / 1000);
            return res.status(429).json({
                message: `Please wait ${secondsLeft} seconds before requesting another OTP`,
                waitTime: secondsLeft
            });
        }

        // Generate new OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        const resendCooldown = new Date(Date.now() + 30 * 1000); // 30 seconds

        console.log(`\n📧 OTP Resent for ${email}`);
        console.log(`OTP Code: ${otp}`);
        console.log(`Expires at: ${otpExpires}\n`);

        user.otp = otp;
        user.otpExpires = otpExpires;
        user.otpResendCooldown = resendCooldown;
        await user.save();

        // Send OTP to email
        await sendOTPEmail(email, otp, user.name);

        res.json({
            message: 'OTP resent successfully',
            email: email,
            expiresIn: 300 // 5 minutes in seconds
        });

    } catch (err) {
        console.error('❌ Login resend OTP error:', err.message);
        res.status(500).json({ message: 'Failed to resend OTP. Please try again.' });
    }
});

// ==================== PROFILE ROUTES ====================

// GET profile with trip stats
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -otp -otpExpires -otpResendCooldown -tempData');
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
        ).select('-password -otp -otpExpires -otpResendCooldown -tempData');

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
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== LEGACY ROUTES (for backward compatibility) ====================

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email: String(email) });


        if (user && user.isVerified) {
            return res.status(400).json({ message: "User exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hash, isVerified: true });

        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET);


        res.json({ token, user });

    } catch (err) {
        res.status(500).send("Server error");
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: String(email) });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);


        res.json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;