import { PendingUser, User } from "../schemas.js";
import { GenerateRandomNumber } from '../utils/randomNumber.js';

export const confirmationController = async (req, res) => {
    const { confirmation_code } = req.body;

    const existingPending = await PendingUser.findOne({ confirmation_code });
    if (!existingPending) {
        return res.status(400).json({ msg: "Confirmation code not found" });
    }

    if (existingPending.expirationTime < Date.now()) {
        return res.status(400).json({ msg: "Confirmation code has expired" });
    }

    const balance = GenerateRandomNumber(10000, 90000);
    const user = new User({
        _id: existingPending._id,
        first_name: existingPending.first_name,
        last_name: existingPending.last_name,
        phone_number: existingPending.phone_number,
        password: existingPending.password,
        balance,
    });

    try {
        await user.save();
    } catch (err) {
        console.error('Error saving user:', err.message);
        return res.status(500).json({ msg: 'Failed to save the user data' });
    }

    try {
        await PendingUser.deleteOne({ confirmation_code });
    } catch (err) {
        console.error('Error deleting pending user:', err.message);
        return res.status(500).json({ msg: 'Failed to delete the pending confirmation' });
    }

    return res.status(200).json({ msg: "User successfully confirmed and activated" });
}
