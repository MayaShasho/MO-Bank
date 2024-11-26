import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

export const refreshToken = (req, res, next) => {
    let oldRefresh = req.body.refreshToken;
    if (!oldRefresh) {
        return res.status(401).json({ error: 'Access denied' });
    }
    let decoded = null;
    try {
        decoded = jwt.verify(oldRefresh, process.env.JWT_REFRESH_SECRETE_KEY);
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const newAccessToken = generateAccessToken({ userId: decoded.userId });
    const newRefreshToken = generateRefreshToken({ userId: decoded.userId });

    return res.status(200).json({ "status": "Success", newAccessToken, newRefreshToken });

};
