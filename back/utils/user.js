import { User } from "../schemas.js";
import { GenerateRandomNumber } from './randomNumber.js';

export const createUser = async (pendingUserData) => {
    const balance = GenerateRandomNumber(10000, 90000);

    const newUser = new User({
        _id: pendingUserData._id,
        first_name: pendingUserData.first_name,
        last_name: pendingUserData.last_name,
        phone_number: pendingUserData.phone_number,
        password: pendingUserData.password,
        balance,
    });

    return newUser
};


export const saveUserToDatabase = async (newUser) => {
    try {
        await newUser.save();
    } catch (err) {
        throw new Error('Failed to save the user data: ' + err.message);
    }
};