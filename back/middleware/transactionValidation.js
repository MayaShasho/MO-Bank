import { User } from "../schemas.js";

export const verifyTransaction = async (req, res, next) => {
    const { to, amount } = req.body;
    const from = req.userId;
    if (to == from) {
        return res.status(400).json({ status: "Failed", message: "Transaction can't be completed" });
    }

    if (!to || !amount) {
        return res.status(400).json({ status: "Failed", message: "All fields are required" });
    }

    if (amount <= 0) {
        return res.status(400).json({ status: "Failed", message: "Invalid transaction amount" });
    }

    try {
        const sender = await User.findById(from);
        const receiver = await User.findById(to);

        if (!sender) {
            return res.status(404).json({ status: "Failed", message: "Sender email not found" });
        }

        if (!receiver) {
            return res.status(404).json({ status: "Failed", message: "Receiver email not found" });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ status: "Failed", message: "Insufficient balance" });
        }

        req.sender = sender;
        req.receiver = receiver;

        next();
    } catch (error) {
        console.error("Error validating transaction:", error.message);
        return res.status(500).json({ status: "Failed", message: "Internal server error" });
    }
};
