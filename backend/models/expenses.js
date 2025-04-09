//database table 
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const expenseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        // add function that points to user/model 
    },

    amount: {
        type: Number,
        required: true,
    },
})

export const Expense = mongoose.model('Expense', expenseSchema);