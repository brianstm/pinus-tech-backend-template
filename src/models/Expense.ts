import { mongoose } from "mongoose";

const Expense = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        userId: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: true
        },
        imageURL: {
            type: String,
            required: false
        }
    }
)

export const Transaction = mongoose.model('Expense', Expense);