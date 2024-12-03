import { User } from "../schemas.js";

export const infoController = async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }

    res.status(200).json({
        info: {
            email: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
        }
    });
}