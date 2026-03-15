const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    },
    otpResendCooldown: {
        type: Date,
        default: null
    },
    tempData: {
        type: Object,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);