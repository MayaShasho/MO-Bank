import { PendingUser } from "../schemas.js";
import { createUser, saveUserToDatabase } from "../utils/user.js";
import { validateConfirmationCode } from "../middleware/confirmationCodeValidation.js"

export const confirmationController = async (req, res) => {
    const { confirmation_code } = req.body;

    try {
        const existingPending = await validateConfirmationCode(confirmation_code);
        const newUser = await createUser(existingPending);

        await saveUserToDatabase(newUser);

        await PendingUser.deleteOne({ confirmation_code });

        return res.status(200).json({ message: "User successfully confirmed and activated" });
    } catch (err) {
        console.error(err.message);
        return res.status(400).json({ message: err.message });
    }
};