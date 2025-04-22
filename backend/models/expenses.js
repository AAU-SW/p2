//database table
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

        required: true,
        // add function that points to user/model
    },
    expense: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    expenseType: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
})


export const Expense = mongoose.model('Expense', expenseSchema);

