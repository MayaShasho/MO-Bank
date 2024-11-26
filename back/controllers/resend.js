import { GenerateRandomNumber } from '../utils/randomNumber.js';
import { EmailForm, SendEmail } from '../utils/email.js';
import { PendingUser, User, CodeExpirationTime } from '../schemas.js';

export const resendController = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: 'Failed', message: 'Email is required' });
    }

    try {
        const userExist = await User.exists({ _id: email });
        if (userExist) {
            return res.status(400).json({ status: 'Failed', message: 'Email already confirmed' });
        }

        const existingPending = await PendingUser.findById(email);
        if (!existingPending) {
            return res.status(404).json({ status: 'Failed', message: 'Email not found' });
        }

        const newEmailCode = GenerateRandomNumber(100000, 900000);
        existingPending.confirmation_code = newEmailCode;
        existingPending.expirationTime = Date.now() + CodeExpirationTime;

        await existingPending.save();
        console.log('newEmailCode: ', newEmailCode);

        const userEmailForm = EmailForm(email, newEmailCode);
        await SendEmail(userEmailForm);

        return res.status(200).json({ status: 'Success', message: 'Verification code resent successfully' });
    } catch (error) {
        console.error('Error resending email code:', error.message);
        return res.status(500).json({ status: 'Failed', message: 'Internal server error' });
    }
};