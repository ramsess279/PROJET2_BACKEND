import jwt, {} from "jsonwebtoken";
const AuthMiddleware = {
    TokenVerifed: (req, res, next) => {
        try {
            const exist = req.headers.authorization;
            if (!exist || !exist.startsWith("Bearer")) {
                return res.status(401).json({ error: "Token manquant ou invalide " });
            }
            const token = exist.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "Token Absent !" });
            }
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            next();
        }
        catch {
            return res.status(401).json({ error: "Token invalide ou expiré " });
        }
    }
};
export default AuthMiddleware;
//# sourceMappingURL=auth.middelware.js.map