const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../middleware/auth'); // Ensure this line is here

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ name, email, password });
        await user.save();
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
});

// GET User Profile Route
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT User Profile Route
router.put('/profile', auth, async (req, res) => {
    const { name, bio } = req.body;

    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (bio) profileFields.bio = bio;

    try {
        let user = await User.findById(req.user.id);

        if (user) {
            user = await User.findByIdAndUpdate(
                req.user.id,
                { $set: profileFields },
                { new: true }
            ).select('-password');

            return res.json(user);
        }
        res.status(400).json({ msg: 'User not found' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
