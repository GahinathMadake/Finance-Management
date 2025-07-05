const mongoose = require('mongoose');

const incomeSourceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
});

const budgetSchema = new mongoose.Schema({
  month: { 
    type: Number, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  budgetAmount: { 
    type: Number, 
    required: true 
  },
  incomeSources: [incomeSourceSchema],
}, {
  timestamps: true,
});

budgetSchema.index({ month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema);
