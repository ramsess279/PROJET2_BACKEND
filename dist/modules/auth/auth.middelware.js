import jwt, {} from "jsonwebtoken";
import prisma from "../../config/db.js";
const AuthMiddleware = {
    TokenVerifed: async (req, res, next) => {
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
            // Récupérer les informations complètes de l'utilisateur depuis la base de données
            const user = await prisma.utilisateur.findUnique({
                where: { id: payload.id }
            });
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé" });
            }
            // Fusionner les données du token avec celles de la base de données
            req.user = {
                ...payload,
                ...user,
                // Conserver les valeurs du token si elles existent (comme entrepriseId pour les super-admins)
                entrepriseId: payload.entrepriseId !== undefined ? payload.entrepriseId : user.entrepriseId,
            };
            next();
        }
        catch {
            return res.status(401).json({ error: "Token invalide ou expiré " });
        }
    }
};
export default AuthMiddleware;
//# sourceMappingURL=auth.middelware.js.map