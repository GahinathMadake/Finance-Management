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
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
