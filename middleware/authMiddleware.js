const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: `Access Denied. Only ${requiredRole}s allowed!` });
        }
        next();
    };
};

module.exports = authorizeRole;
