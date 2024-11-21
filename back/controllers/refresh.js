import jwt from 'jsonwebtoken'

export const refreshToken = (req, res, next) => {
    let oldRefresh = req.body.refreshToken;
    console.log(oldRefresh);
    if (!oldRefresh) {
        return res.status(401).json({ error: 'Access denied' });
    }
    let decoded = null;
    try {
        decoded = jwt.verify(oldRefresh, "maya123maya");
        console.log(decoded);
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    const newToken = { userId: decoded.userId }

    const accessToken = jwt.sign(newToken, "hfOdRrHxsyA+p6fGak/LxbKSK+sUMunrYCS68CDqjnim59/X1comYRwHiUNwJA2AEt9L3LmjV9oQBx+Cf/yRqw==", {
        expiresIn: '5m'
    });

    const refreshToken = jwt.sign(newToken, "maya123maya", {
        expiresIn: '2h'
    });

    return res.status(200).json({ "status": "Success", accessToken, refreshToken });

};
