import { PendingUser, User } from "../schemas.js";

export const confirmationController = async (req, res) => {
    let { confirmation_code } = req.body;
    let existingPending = await PendingUser.findById(confirmation_code);
    if (!existingPending) {
        return res.status(400).json({ msg: "Not confirm" })
    }
    if (existingPending.expirationTime < Date.now()) {
        return res.status(400).json({ msg: "Too late" })
    }

    await User.updateOne({ _id: existingPending.email }, { activated: true });
    await PendingUser.deleteOne({ _id: confirmation_code });
    return res.status(200).json({ msg: "Success" })
}
