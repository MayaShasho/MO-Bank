import mongoose from "mongoose";

const codeExpirationTime = 2 * 60 * 1000;
const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },
        first_name: {
            type: String,
            require: true
        },
        last_name: String,
        phone_number: String,
        password: String,
        activated: {
            type: Boolean,
            default: false,
        }
    }, { timestamps: true }
)
export const User = mongoose.model('user', userSchema);

const confirmationSchema = new mongoose.Schema(
    {
        _id: String,
        email: String,
        expirationTime: {
            type: Date,
            default: () => (Date.now() + codeExpirationTime)
        }
    }
)

export const PendingUser = mongoose.model('pending', confirmationSchema);


