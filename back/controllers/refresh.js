import jwt from 'jsonwebtoken'

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
    const newToken = { userId: decoded.userId }
    const accessToken = jwt.sign(newToken, process.env.JWT_SECRETE_KEY, {
        expiresIn: '2m'
    });

    const refreshToken = jwt.sign(newToken, process.env.JWT_REFRESH_SECRETE_KEY, {
        expiresIn: '2h'
    });

    return res.status(200).json({ "status": "Success", accessToken, refreshToken });

};
