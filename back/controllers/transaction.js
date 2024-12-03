import { Transaction } from "../schemas.js";

export const transactionController = async (req, res) => {
    const { sender, receiver } = req;
    const { amount } = req.body;

    try {
        const transactionAmount = parseFloat(amount);
        if (isNaN(transactionAmount) || transactionAmount <= 0) {
            return res.status(400).json({ status: "Failed", message: "Invalid transaction amount" });
        }

        const transaction = new Transaction({ from: sender._id, to: receiver._id, amount: transactionAmount });

        await transaction.save();

        sender.balance = parseFloat(sender.balance) - transactionAmount;
        receiver.balance = parseFloat(receiver.balance) + transactionAmount;

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
