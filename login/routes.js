const express = require('express');
const jwt = require('jsonwebtoken');
const { loginAdmin } = require("./controller");

const router = express.Router();
const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
    throw new Error('JWT secret key is not set in the environment variables.');
}

// Middleware для проверки JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Извлечение токена из заголовка "Bearer token"

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        req.username = decoded.username;
        next();
    });
};

router.post('/login', loginAdmin);
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is protected content', username: req.username });
});

module.exports = router;
