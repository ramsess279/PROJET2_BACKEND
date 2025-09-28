export function requireRole(role) {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ error: "Accès interdit : rôle insuffisant" });
        }
        next();
    };
}
//# sourceMappingURL=role.middleware.js.map