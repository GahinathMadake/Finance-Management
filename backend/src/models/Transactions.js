const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    description: { 
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
