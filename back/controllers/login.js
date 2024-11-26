import { User } from '../schemas.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findById(email);

    if (!existingUser || existingUser.password !== password) {
        return res.status(400).json({ msg: "Wrong email or password" })
    }

    const accessToken = generateAccessToken({ userId: req.body.email });
    const refreshToken = generateRefreshToken({ userId: req.body.email });

    return res.status(200).json({ status: "Success", message: "Login successful", accessToken, refreshToken });
}