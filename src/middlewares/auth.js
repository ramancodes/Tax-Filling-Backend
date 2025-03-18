const jwt = require('jsonwebtoken');

module.exports = {
    auth: async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    message: 'No token provided',
                    error: 'Unauthorized'
                });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userData = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Authentication failed',
                error: error.message
            });
        }
    }
}