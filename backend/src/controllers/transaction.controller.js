const Transaction = require('../models/Transactions');
const Category = require('../models/Category');


// POST /api/transaction/add-transaction
const createTransaction = async (req, res) => {
  try {
    const { name, amount, date, description, category } = req.body;

    console.log(req.body);

    // Validate required fields
    if (!name || !amount || !date || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate if the provided category
    const categoryDoc = await Category.findOne({ type: category });
    if (!categoryDoc) {
      return res.status(400).json({ error: 'Category not found' });
    }


    const transaction = new Transaction({
      name,
      amount,
      date,
      description,
      category: categoryDoc._id
    });


    await transaction.save();

    // Optionally populate the category field for response
    await transaction.populate('category');

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/transaction/all
const getAllTransactions = async (req, res) => {
  try {
    console.log("All Transactions");
    const transactions = await Transaction.find().populate('category');;
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
    }).populate('category');

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
  const { name, amount, date, description, category } = req.body;

  try {
    const updatedTxn = await Transaction.findByIdAndUpdate(
      id,
      {
        name,
        amount,
        date,
        description,
        category, // ✅ Include category in update
      },
      { new: true }
    ).populate('category'); // ✅ Populate category for frontend

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
