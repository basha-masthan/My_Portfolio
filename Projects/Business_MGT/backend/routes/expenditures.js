const router = require('express').Router();
const Expenditure = require('../models/Expenditure');

// Get all expenditures
router.get('/', async (req, res) => {
    try {
        const expenditures = await Expenditure.find().sort({ date: -1 });
        res.json(expenditures);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add expenditure
router.post('/', async (req, res) => {
    const newExpenditure = new Expenditure(req.body);
    try {
        const savedExpenditure = await newExpenditure.save();
        res.status(200).json(savedExpenditure);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
