const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hash });

        await user.save();

        const token = jwt.sign({ id: user._id }, "secretkey");

        res.json({ token, user });

    } catch (err) {

        res.status(500).send("Server error");

    }

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, "secretkey");

        res.json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;