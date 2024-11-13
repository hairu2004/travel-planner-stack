const mongoose = require('mongoose');

const TravelPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    },
    budget: {
        type: Number,
        required: true
    },
    expenses: [{
        description: String,
        amount: Number,
        date: Date
    }],
    distance: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TravelPlan', TravelPlanSchema);
