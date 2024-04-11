const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err){ console.log(err);
            return res.status(403).json({ message: 'Invalid token' });}
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;
