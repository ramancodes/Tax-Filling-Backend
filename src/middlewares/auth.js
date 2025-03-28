const jwt = require('jsonwebtoken');

module.exports = {
    auth: async (req, res, next) => {
        try {
            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
            }
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