const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/jwtConfig');

module.exports = function (req, res, next) {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid authorization format' });
    }

    try {

        const token = authHeader.slice('Bearer '.length).trim();
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded?.id || decoded?._id || decoded?.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        req.user = { ...decoded, id: String(userId) };

        next();

    } catch (err) {

        console.error('Auth middleware error:', err.message);

        res.status(401).json({ message: 'Invalid token' });

    }

}