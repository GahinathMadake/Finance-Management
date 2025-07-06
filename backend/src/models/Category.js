const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'Travelling',
      'Healthcare',
      'Utilities',
      'Shopping',
      'Education',
      'Food',
    ],
  },
  isCustom: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
