import nodemailer from 'nodemailer';

export const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const EmailForm = (email, emailCode) => {
    return {
        from: process.env.EMAIL_USER,
        to: email,
        subject: process.env.EMAIL_SUBJECT,
        text: process.env.EMAIL_TEXT + ' ' + emailCode,
    };
};

export const SendEmail = async (userEmailForm) => {
    try {
        const info = await Transporter.sendMail(userEmailForm);
        console.log('Email sent:', info.response);
        return info.response;
    } catch (error) {
        console.error('Failed to send email:', error.message);
        throw error;
    }
};
