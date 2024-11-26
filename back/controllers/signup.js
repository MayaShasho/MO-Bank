import { PendingUser } from "../schemas.js";
import { EmailForm, SendEmail } from "../utils/email.js";
import { GenerateRandomNumber } from "../utils/randomNumber.js";

export const signupController = async (req, res) => {
    const { first_name, last_name, phone_number, email, password } = req.body;
    const emailCode = GenerateRandomNumber(100000, 900000);

    const pendingUser = new PendingUser({ _id: email, first_name, last_name, phone_number, password, confirmation_code: emailCode });

    const userExist = await PendingUser.exists({ _id: email });
    if (userExist) {
        return res.status(400).json({ status: ' Already exists' });
    }

    const userEmailForm = EmailForm(email, emailCode);
    try {
        await SendEmail(userEmailForm);
    } catch (error) {
        return res.status(500).json({ status: 'Failed to send email', error: error.message });
    }

    try {
        await pendingUser.save();
    } catch (err) {
        console.log(err.message)
    }

    return res.status(200).json({ status: 'Success', message: req.body });
};