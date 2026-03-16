require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODBURI || 'mongodb://127.0.0.1:27017/tripplanner';
const serverPort = process.env.PORT || 5000;

mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/ai', require('./routes/ai'));

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
    const { email = 'test@example.com', otp = '123456', name = 'Test User' } = req.body;
    try {
        const { sendOTPEmail } = require('./utils/emailService');
        const result = await sendOTPEmail(email, otp, name);
        res.json({ success: true, message: 'Email test completed', result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));
