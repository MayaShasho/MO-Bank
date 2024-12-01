import { PendingUser } from "../schemas.js";

export const validateConfirmationCode = async (confirmation_code) => {
    const existingPending = await PendingUser.findOne({ confirmation_code });
    if (!existingPending) {
        throw new Error("Confirmation code not found");
    }

    if (existingPending.expirationTime < Date.now()) {
        throw new Error("Confirmation code has expired");
    }

    return existingPending;
};
