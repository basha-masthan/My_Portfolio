const router = require('express').Router();
const Tenant = require('../models/Tenant');
const Expenditure = require('../models/Expenditure');

// Helper to parse month/year
const getMonthDateRange = (monthStr, year) => {
    // Expects monthStr like "January", "Feb", etc.
    const monthIndex = new Date(`${monthStr} 1, ${year}`).getMonth();
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0); // Last day of month
    return { startDate, endDate };
};

router.get('/monthly', async (req, res) => {
    const { month, year } = req.query; // e.g. ?month=January&year=2025

    if (!month || !year) {
        return res.status(400).json({ message: "Month and Year required" });
    }

    try {
        // 1. Calculate Income from Tenants (Paid Dues)
        // We filter dues where status is 'Paid' and month string matches
        // For simplicity, we assume the user's string input for 'month' in dues matches the query
        // Or we regex match. Let's try exact match first as per current UI
        const tenants = await Tenant.find();
        let totalIncome = 0;

        // Income detail for breakdown
        const incomeBreakdown = [];

        tenants.forEach(tenant => {
            tenant.dues.forEach(due => {
                // Check if due is Paid and matches month (case insensitive check recommended)
                if (due.status === 'Paid' && due.month.toLowerCase().includes(month.toLowerCase())) {
                    totalIncome += due.amount;
                    incomeBreakdown.push({
                        source: tenant.name,
                        amount: due.amount,
                        date: due.dueDate || 'N/A'
                    });
                }
            });
        });

        // 2. Calculate Expenses
        // Expenses have proper Date objects, so we verify the date range
        const { startDate, endDate } = getMonthDateRange(month, year);

        const expenses = await Expenditure.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        // 3. Result
        const netProfit = totalIncome - totalExpense;

        res.json({
            month,
            year,
            totalIncome,
            totalExpense,
            netProfit,
            stats: {
                incomeCount: incomeBreakdown.length,
                expenseCount: expenses.length
            },
            details: {
                expenses,
                income: incomeBreakdown
            }
        });

    } catch (err) {
        console.error("Report Error:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
