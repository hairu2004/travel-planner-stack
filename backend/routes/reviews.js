const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Review = require('../models/Review');

// @route    POST api/reviews
// @desc     Add a review
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('rating', 'Rating is required').not().isEmpty(),
            check('comment', 'Comment is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { trip, rating, comment } = req.body;

        try {
            const newReview = new Review({
                user: req.user.id,
                trip,
                rating,
                comment
            });

            const review = await newReview.save();

            res.json(review);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/reviews/:tripId
// @desc     Get reviews for a trip
// @access   Public
router.get('/:tripId', async (req, res) => {
    try {
        const reviews = await Review.find({ trip: req.params.tripId }).populate('user', ['name']);
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
