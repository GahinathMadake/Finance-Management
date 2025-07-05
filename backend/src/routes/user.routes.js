const express = require('express');
const { getDashboardData } = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/dashboard-data', getDashboardData);

module.exports = router;