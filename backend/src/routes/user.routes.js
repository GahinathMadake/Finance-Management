const express = require('express');
const { getDashboardData, getMonthlyChartData, getCategoryWiseExpenses } = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/dashboard-data', getDashboardData);
router.get("/monthly-chart-data", getMonthlyChartData);
router.get("/category-wise-expenses", getCategoryWiseExpenses);

module.exports = router;