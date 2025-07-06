const Transaction = require('../models/Transactions.js');
const Budget = require('../models/Budget.js');

const getDashboardData = async (req, res) => {
  try {

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // 1. Total expenses this month
    const transactions = await Transaction.find({
      date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

    // 2. Tracked categories
    const categories = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
        },
      },
      {
        $group: {
          _id: '$category',
        },
      },
      {
        $count: 'uniqueCategories',
      },
    ]);

    const categoriesTracked = categories[0]?.uniqueCategories || 0;


    // 3. Monthly Budget
    const budgetDoc = await Budget.findOne({ month: currentMonth + 1, year: currentYear });
    const monthlyBudget = budgetDoc ? budgetDoc.budgetAmount : 0;

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


const getMonthlyChartData = async (req, res) => {
  try {
    const months = parseInt(req.query.months) || 6;

    const now = new Date();
    const results = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

      const month = date.getMonth();
      const year = date.getFullYear();
      const monthName = date.toLocaleString("en-US", { month: "long" });

      // Get budget for the month
      const budgetDoc = await Budget.findOne({ month: month + 1, year });
      const budget = budgetDoc ? budgetDoc.budgetAmount : 0;

      // Get total expenses for the month from transactions
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0, 23, 59, 59);

      const expensesAgg = await Transaction.aggregate([
        {
          $match: {
            date: {
              $gte: firstDay,
              $lte: lastDay,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      const expenses = expensesAgg.length > 0 ? expensesAgg[0].total : 0;

      results.push({
        month: monthName,
        budget,
        expenses,
      });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error in getMonthlyChartData:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



const getCategoryWiseExpenses = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const result = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: startOfMonth, $lte: now },
        },
      },
      {
        $group: {
          _id: "$category",
          amount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories", // MongoDB collection name
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $project: {
          _id: 0,
          category: "$categoryInfo.type",
          amount: 1,
        },
      },
      {
        $sort: { amount: -1 },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error fetching category-wise data", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = { getDashboardData, getMonthlyChartData, getCategoryWiseExpenses };
