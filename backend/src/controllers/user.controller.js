const Transaction = require('../models/Transactions.js');
// const Category = require('../models/Category.js');
const Budget = require('../models/Budget.js');

const getDashboardData = async (req, res) => {
  try {

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // 1. Total expenses this month
    const transactions = await Transaction.find({
      date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

    // 2. Tracked categories
    const categoriesTracked = 5; //await Category.countDocuments({ user: userId });

    // 3. Monthly Budget
    const budgetDoc = await Budget.findOne({ user: userId });
    const monthlyBudget = 25000; //budgetDoc ? budgetDoc.amount : 0;

    // 4. Recent transactions (this month count)
    const recentTransactions = transactions.length;

    res.json({
      totalExpenses,
      categoriesTracked,
      monthlyBudget,
      recentTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};


module.exports = {getDashboardData};
