import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRETE_KEY, { expiresIn: process.env.SHORT_EXPIRES_TOKEN });
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRETE_KEY, { expiresIn: process.env.LONG_EXPIRES_TOKEN });
};

