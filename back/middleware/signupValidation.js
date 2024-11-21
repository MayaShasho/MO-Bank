import { body } from "express-validator";

export const signupValidate = [
    body("first_name").isAlpha().withMessage("Unvalid first name"),
    body("last_name").isAlpha().withMessage("Unvalid last name"),
    body("phone_number").isMobilePhone().withMessage("Unvalid phone number"),
    body("email").isEmail().withMessage("Unvalid email"),
    body("password").isLength({ min: 6 }).withMessage("Unvalid password")
];

