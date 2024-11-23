import { User, PendingUser } from "../schemas.js";
import { transporter } from "../sender.js";

export const signupController = async (req, res) => {
    let { first_name, last_name, phone_number, email, password } = req.body;
    let newUser = new User({ _id: email, first_name, last_name, phone_number, password });

    const emailCode = Math.floor(Math.random() * 90000) + 10000;

    try {
        await newUser.save();
    } catch (err) {
        console.log(err.message)
    }

    const mailOptions = {
        from: 'mobank158@gmail.com',
        to: email,
        subject: 'Email Confirmation',
        text: "Use the following 5 digit code to confirm your email address \n" + emailCode.toString()
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    let pendingUser = new PendingUser({ _id: emailCode, email });
    try {
        await pendingUser.save();
    } catch (err) {
        console.log(err.message)
    }


    return res.status(200).json({ "status": "Success", message: req.body });
}