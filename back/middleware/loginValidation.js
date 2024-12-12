import { body } from "express-validator";

export const loginValidate = [
    body("email").isEmail().withMessage(" invalid email"),
    body("password").isLength({ min: 6 }).withMessage(" invalid password")
];

