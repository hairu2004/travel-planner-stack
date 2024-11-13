const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const TravelPlan = require('../models/TravelPlan');

// Delete travel plan by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        console.log("Delete request for ID:", req.params.id); // Debugging log
        const travelPlan = await TravelPlan.findById(req.params.id);
        if (!travelPlan) {
            return res.status(404).json({ msg: 'Travel plan not found' });
        }
        await TravelPlan.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Travel plan removed' });
    } catch (err) {
        console.error('Error:', err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Travel plan not found' });
        }
        res.status(500).send('Server Error');
    }
});

// GET /api/travelPlans - Fetch user's travel plans
router.get('/', auth, async (req, res) => {
    try {
        const travelPlans = await TravelPlan.find({ userId: req.user.id });
        res.json(travelPlans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/travelPlans - Add a new travel plan
router.post('/', auth, async (req, res) => {
    const { from, to, destination, startDate, endDate, notes, budget, expenses, distance } = req.body;

    try {
        const newTravelPlan = new TravelPlan({
            userId: req.user.id,
            from,
            to,
            destination,
            startDate,
            endDate,
            notes,
            budget,
            expenses,
            distance
        });

        const travelPlan = await newTravelPlan.save();
        res.json(travelPlan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
