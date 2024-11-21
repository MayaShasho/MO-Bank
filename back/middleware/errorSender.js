import { validationResult } from "express-validator"

export const errorSender = (req, res, next) => {
    const validationRes = validationResult(req);

    if (!validationRes.isEmpty()) {
        const errors = [];
        validationRes.array().map((validationRes) => errors.push(validationRes.msg))
        return res.status(400).json({ "error": "Bad request", message: errors });
    }

    next();
}