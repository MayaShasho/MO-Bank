import { body } from "express-validator";

export const loginValidate = [
    body("email").isEmail().withMessage("Unvalid email"),
    body("password").isLength({ min: 6 }).withMessage("Unvalid password")
];

