const express = require('express');
const router = express.Router();
const { createTransaction, getAllTransactions, getThisMonthTransactions, deleteTransaction, updateTransaction} = require('../controllers/transaction.controller');

router.post('/add-transaction', createTransaction);
router.get('/all', getAllTransactions);
router.get('/this-month', getThisMonthTransactions);
router.delete('/delete/:id', deleteTransaction);
router.put('/update/:id', updateTransaction);

module.exports = router;
