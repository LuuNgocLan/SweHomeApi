const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        res.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            code: 401,
            status: "Error",
            message: 'Auth failed ' + error
        });
    }
}