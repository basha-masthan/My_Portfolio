const mongoose = require('mongoose');

const ExpenditureSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['PG Rent', 'Vegetables', 'Rice', 'Ration', 'Milk', 'Meat', 'Water', 'Electricity', 'Salary', 'Other']
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
    paidTo: { type: String } // For salaries or vendors
}, { timestamps: true });

module.exports = mongoose.model('Expenditure', ExpenditureSchema);
