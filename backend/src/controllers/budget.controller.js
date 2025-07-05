const Budget = require('../models/Budget');


const addBudget = async (req, res) => {
  try {
    let { name, month, year, budgetAmount, incomeSources } = req.body;
    const errors = [];

    if (!month || !year || !budgetAmount || !incomeSources || incomeSources.length === 0) {
      errors.push('Missing required budget fields');
    }

    incomeSources = incomeSources.filter(src => src.name && src.amount > 0);

    if (incomeSources.length === 0) {
      errors.push('At least one valid income source is required');
    }

    const existingBudget = await Budget.findOne({ month, year });
    if (existingBudget) {
      errors.push(`A budget for ${month}/${year} already exists`);
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Create and save the budget
    const budget = new Budget({
      name,
      month,
      year,
      budgetAmount,
      incomeSources,
    });

    await budget.save();

    return res.status(201).json({
      message: 'Budget created successfully',
      budget,
    });
  } catch (error) {
    console.error('Failed to create budget:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {addBudget};