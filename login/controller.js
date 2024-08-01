const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = process.env.JWT_SECRET;
const adminUsername = process.env.ADMIN_USERNAME;
const adminPasswordHash = process.env.ADMIN_PASSWORD;

module.exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        if (username !== adminUsername) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, bcrypt.hashSync(adminPasswordHash, 10));

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!secretKey) {
            return res.status(500).json({ message: 'Server configuration error: JWT secret not set' });
        }

        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
