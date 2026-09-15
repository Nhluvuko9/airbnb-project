const jwt = require('jsonwebtoken');

// Login middleware
const protect = (req, res, next) => {
    let token;

    // Checks if authorization header exists
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            // Token verification using secret key
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                id: decode.id,
                role: decode.role
            };
            return next();

        } catch (error) {
            console.error("Token validation error")
            return res.status(401).json({ message: "Not authorized"});
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token"});
    }
}

// Reservations middleware
const security = (req, res, next) => {
    let token;

    // Checks if authorization header exists
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            // Token verification using secret key
            const decode = jwt.verify(token, process.env.JWT_SECRET || 'a-long-random-secret-string-12345');
            req.user = decode;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized"});
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized"});
    }
}

const authorize = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
};

module.exports = { protect, security, authorize };