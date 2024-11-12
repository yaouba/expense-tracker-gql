import { Schema, Types, model } from "mongoose"

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        enum: ["CASH", "CARD"],
        required: true,
    },
    category: {
        type: String,
        enum: ["expense", "saving", "investment"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        default: "Unknown",
    },
    date: {
        type: Date,
        required: true,
    },
})

const Transaction = model("Transaction", transactionSchema)

export default Transaction
