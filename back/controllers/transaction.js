import { Transaction } from "../schemas.js";

export const transactionController = async (req, res) => {
    const { sender, receiver } = req;
    const { amount } = req.body;
    try {
        const transaction = new Transaction({ from: sender._id, to: receiver._id, amount });
        await transaction.save();

        sender.balance -= amount;
        receiver.balance += amount;

        sender.transactions.push(transaction._id);
        receiver.transactions.push(transaction._id);

        await sender.save();
        await receiver.save();

        return res.status(200).json({ status: "Success", message: "Transaction completed successfully" });
    } catch (error) {
        console.error("Error processing transaction:", error.message);
        return res.status(500).json({ status: "Failed", message: "Internal server error" });
    }
};
