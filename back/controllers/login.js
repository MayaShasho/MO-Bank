import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import { User } from '../schemas.js';


export const loginController = async (req, res) => {
    let { email, password } = req.body;
    let existingUser = await User.findById(email);

    if (!existingUser) {
        return res.status(400).json({ msg: "Wrong email" })
    }
    if (existingUser.password !== password) {
        return res.status(400).json({ msg: "Wrong password" })
    }
    if (!existingUser.activated) {
        return res.status(400).json({ msg: "Not activated yet" })
    }
    const accessToken = jwt.sign({ userId: req.body.email }, process.env.JWT_SECRETE_KEY, {
        expiresIn: '5m'
    });

    const refreshToken = jwt.sign({ userId: req.body.email }, "maya123maya", {
        expiresIn: '2h'
    });

    return res.status(200).json({ "status": "Success", accessToken, refreshToken });
}