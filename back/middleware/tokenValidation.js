import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.get('Authorization').split(" ")[1];
    // to check this :     const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Access token expired' });
    }
};



