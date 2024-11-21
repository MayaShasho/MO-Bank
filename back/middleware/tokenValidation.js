import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.get('Authorization').split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, "hfOdRrHxsyA+p6fGak/LxbKSK+sUMunrYCS68CDqjnim59/X1comYRwHiUNwJA2AEt9L3LmjV9oQBx+Cf/yRqw==");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};



