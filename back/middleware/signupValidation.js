import { body } from "express-validator";

export const signupValidate = [
    body("first_name").isAlpha().withMessage(" invalid first name"),
    body("last_name").isAlpha().withMessage(" invalid last name"),
    body("phone_number").isMobilePhone().withMessage(" invalid phone number"),
    body("email").isEmail().withMessage(" invalid email"),
    body("password").isLength({ min: 6 }).withMessage(" invalid password")
];

