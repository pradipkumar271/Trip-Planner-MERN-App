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

app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));