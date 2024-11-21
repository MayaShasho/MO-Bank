import mongoose from "mongoose";
import { User, PendingUser } from "../schemas.js";

export const signupController = async (req, res) => {
    let { first_name, last_name, phone_number, email, password } = req.body;
    let newUser = new User({ _id: email, first_name, last_name, phone_number, password });

    try {
        await newUser.save();
    } catch (err) {
        console.log(err.message)
    }
    let confirmationCode = "123456"

    let pendingUser = new PendingUser({ _id: confirmationCode, email });
    try {
        await pendingUser.save();
    } catch (err) {
        console.log(err.message)
    }


    return res.status(200).json({ "status": "Success", message: req.body });
}