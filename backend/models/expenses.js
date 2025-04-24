//database table
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expense: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    expenseType: {
        type: String,
        enum: ['Food & Groceries', 'Transport', 'Rent','Insurance','Entertainment', 'Other' ],
        required: true,
    },
})


export const Expense = mongoose.model('Expense', expenseSchema);

