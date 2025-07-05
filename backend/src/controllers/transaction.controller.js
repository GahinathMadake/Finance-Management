const Transaction = require('../models/Transactions');

// POST /api/transaction/add-transaction
const createTransaction = async (req, res) => {
  try {
    const { name, amount, date, description } = req.body;

    console.log(req.body);

    if (!name || !amount || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transaction = new Transaction({ name, amount, date, description });
    await transaction.save();

    res.status(201).json(transaction);
  } 
  catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/transaction/all
const getAllTransactions = async (req, res) => {
  try {
    console.log("All Transactions");
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Get All Transactions Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET /api/transaction/this-month
const getThisMonthTransactions = async (req, res) => {
  try {
    console.log("This Month Transactions");

    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);

    const transactions = await Transaction.find({
      date: { $gte: start, $lte: end }
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Get This Month Transactions Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// DELETE /api/transaction/delete/:id
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  console.log("Deletion Processing", id);

  try {
    const deletedTxn = await Transaction.findByIdAndDelete(id);

    if (!deletedTxn) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete Transaction Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a transaction by ID
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { name, amount, date, description } = req.body;

  try {
    const updatedTxn = await Transaction.findByIdAndUpdate(
      id,
      {
        name,
        amount,
        date,
        description,
      },
      { new: true }
    );

    if (!updatedTxn) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(updatedTxn);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createTransaction, getAllTransactions, getThisMonthTransactions, deleteTransaction, updateTransaction};
