import mongoose from "mongoose";

export const CodeExpirationTime = 2 * 60 * 1000;
const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },
        first_name: {
            type: String,
            require: true
        },
        last_name: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        password: {
            type: String,
        },
        balance: {
            type: Number,
            default: 0,
        },
        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "transaction",
        }],
    }, { timestamps: true }
)


export const User = mongoose.model('user', userSchema);

const confirmationSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },
        first_name: {
            type: String,
            require: true
        },
        last_name: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        password: {
            type: String,
        },
        confirmation_code: {
            type: String,
        },
        expirationTime: {
            type: Date,
            default: () => (Date.now() + CodeExpirationTime)
        }
    }
)

export const PendingUser = mongoose.model('pending', confirmationSchema);

const transactionSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0.01,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const Transaction = mongoose.model("transaction", transactionSchema);