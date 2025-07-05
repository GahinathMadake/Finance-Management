const express = require('express');
const { addBudget  } = require('../controllers/budget.controller');

const router = express.Router();

router.post('/add-budget', addBudget);


module.exports = router;