import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mobank158@gmail.com',
        pass: 'hhgt xpoj frpl qgiv'
    }
});

