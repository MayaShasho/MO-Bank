import { User } from "../schemas.js";

export const transactionHistoryController = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).populate({
            path: "transactions",
            select: "from to amount date"
        });

        if (!user) {
            return res.status(404).json({ status: "Failed", message: "User not found" });
        }

        return res.status(200).json({
            status: "Success",
            message: "Transaction history retrieved successfully",
            transactions: user.transactions,
        });
    } catch (error) {
        console.error("Error retrieving transaction history:", error.message);
        return res.status(500).json({ status: "Failed", message: "Internal server error" });
    }
};