//database table 
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'user', 
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
    date: {
        type: Date,
        required: true,
    },
})

export const expense = mongoose.model('expense', expenseSchema);