const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOTP, sendOTPEmail } = require('../utils/emailService');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../utils/jwtConfig');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_REGEX = /^\d{6}$/;

const OTP_EXPIRY_MS = 5 * 60 * 1000;
const OTP_EXPIRY_SECONDS = OTP_EXPIRY_MS / 1000;
const OTP_RESEND_COOLDOWN_MS = 30 * 1000;
const PASSWORD_MIN_LENGTH = 8;
const BCRYPT_SALT_ROUNDS = 12;

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();
const trimName = (name) => String(name || '').trim();

const isOtpHash = (otpValue) => typeof otpValue === 'string' && otpValue.startsWith('$2');

const getCooldownSeconds = (cooldownDate) => {
    const diff = cooldownDate.getTime() - Date.now();
    return Math.max(1, Math.ceil(diff / 1000));
};

const clearOtpFields = (user) => {
    user.otp = null;
    user.otpExpiry = null;
    user.otpResendCooldown = null;
};

const setOtpFields = async (user) => {
    const otp = generateOTP();
    user.otp = await bcrypt.hash(otp, BCRYPT_SALT_ROUNDS);
    user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);
    return otp;
};

const safeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
    createdAt: user.createdAt
});

const register = async (req, res) => {
    const rawName = trimName(req.body?.name);
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || '');

    if (!rawName || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }

    if (rawName.length < 2) {
        return res.status(400).json({ message: 'Name must be at least 2 characters long' });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
        return res.status(400).json({
            message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
        });
    }

    try {
        let user = await User.findOne({ email });

        if (user && user.isVerified) {
            return res.status(409).json({ message: 'Email already registered. Please login.' });
        }

        const now = new Date();
        if (user?.otpResendCooldown && now < user.otpResendCooldown) {
            const waitTime = getCooldownSeconds(user.otpResendCooldown);
            return res.status(429).json({
                message: `Please wait ${waitTime} seconds before requesting another OTP`,
                waitTime
            });
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

        if (!user) {
            user = new User({
                name: rawName,
                email,
                password: hashedPassword,
                isVerified: false
            });
        } else {
            user.name = rawName;
            user.password = hashedPassword;
            user.isVerified = false;
        }

        const otp = await setOtpFields(user);
        user.otpResendCooldown = new Date(Date.now() + OTP_RESEND_COOLDOWN_MS);

        await user.save();

        try {
            await sendOTPEmail(email, otp, rawName);
        } catch (emailErr) {
            clearOtpFields(user);
            await user.save();
            return res.status(502).json({
                message: 'Failed to send verification email. Please try again.'
            });
        }

        return res.status(201).json({
            message: 'OTP sent to your email. Please verify your account.',
            email,
            expiresIn: OTP_EXPIRY_SECONDS
        });
    } catch (err) {
        if (err?.code === 11000) {
            return res.status(409).json({ message: 'Email already registered. Please login.' });
        }

        console.error('Register error:', err.message);
        return res.status(500).json({ message: 'Server error during registration' });
    }
};

const verifyOtp = async (req, res) => {
    const email = normalizeEmail(req.body?.email);
    const otp = String(req.body?.otp || '').trim();

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (!OTP_REGEX.test(otp)) {
        return res.status(400).json({ message: 'OTP must be a valid 6-digit code' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Account is already verified. Please login.' });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: 'No active OTP found. Please request a new OTP.' });
        }

        if (new Date() > user.otpExpiry) {
            clearOtpFields(user);
            await user.save();
            return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
        }

        let otpMatch = false;
        if (isOtpHash(user.otp)) {
            otpMatch = await bcrypt.compare(otp, user.otp);
        } else {
            // Backward compatibility for existing plain-text OTPs.
            otpMatch = String(user.otp) === otp;
        }

        if (!otpMatch) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        user.isVerified = true;
        clearOtpFields(user);
        await user.save();

        return res.json({
            message: 'OTP verified successfully. Your account is now active. Please login.'
        });
    } catch (err) {
        console.error('Verify OTP error:', err.message);
        return res.status(500).json({ message: 'Server error while verifying OTP' });
    }
};

const login = async (req, res) => {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || '');

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                message: 'Account is not verified. Please verify OTP before logging in.'
            });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return res.json({
            message: 'Login successful',
            token,
            user: safeUser(user)
        });
    } catch (err) {
        console.error('Login error:', err.message);
        return res.status(500).json({ message: 'Server error during login' });
    }
};

const resendOtp = async (req, res) => {
    const email = normalizeEmail(req.body?.email);

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Account is already verified. Please login.' });
        }

        const now = new Date();
        if (user.otpResendCooldown && now < user.otpResendCooldown) {
            const waitTime = getCooldownSeconds(user.otpResendCooldown);
            return res.status(429).json({
                message: `Please wait ${waitTime} seconds before requesting another OTP`,
                waitTime
            });
        }

        const otp = await setOtpFields(user);
        user.otpResendCooldown = new Date(Date.now() + OTP_RESEND_COOLDOWN_MS);
        await user.save();

        try {
            await sendOTPEmail(email, otp, user.name || 'User');
        } catch (emailErr) {
            clearOtpFields(user);
            await user.save();
            return res.status(502).json({
                message: 'Failed to resend OTP email. Please try again.'
            });
        }

        return res.json({
            message: 'OTP resent successfully',
            email,
            expiresIn: OTP_EXPIRY_SECONDS
        });
    } catch (err) {
        console.error('Resend OTP error:', err.message);
        return res.status(500).json({ message: 'Server error while resending OTP' });
    }
};

module.exports = {
    register,
    verifyOtp,
    login,
    resendOtp
};
