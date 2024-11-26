import { User } from "../schemas.js";

export const balanceController = async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }

    res.status(200).json({ message: "Current balance", balance: user.balance });
}