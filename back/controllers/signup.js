import { PendingUser } from "../schemas.js";
import { EmailForm, SendEmail } from "../utils/email.js";
import { GenerateRandomNumber } from "../utils/randomNumber.js";

export const signupController = async (req, res) => {
    const { first_name, last_name, phone_number, email, password } = req.body;
    const emailCode = GenerateRandomNumber(100000, 900000);

    try {
        const userExist = await PendingUser.exists({ _id: email });
        if (userExist) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }
        const pendingUser = new PendingUser({
            _id: email,
            first_name,
            last_name,
            phone_number,
            password,
            confirmation_code: emailCode,
        });

        const userEmailForm = EmailForm(email, emailCode);
        await SendEmail(userEmailForm);

        await pendingUser.save();

        return res.status(200).json({ status: 'Success', message: req.body });


    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error', error: error.message });
    }

};