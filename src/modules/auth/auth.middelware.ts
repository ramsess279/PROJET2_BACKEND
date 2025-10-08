import type { NextFunction , Request , Response } from "express";
import jwt , {type JwtPayload} from "jsonwebtoken";
import prisma from "../../config/db.js";

declare global {
    namespace Express {
        interface Request{
            user?: JwtPayload;
        }
    }
}


const AuthMiddleware = {
    TokenVerifed: async (req: Request , res: Response , next: NextFunction)=> {

     try {  
        const exist = req.headers.authorization;

        if (!exist || !exist.startsWith("Bearer")){
            return res.status(401).json({error: "Token manquant ou invalide "})
        }

        const token = exist.split(" ")[1];
        if (!token){
            return res.status(401).json({error: "Token Absent !"})
        }

        const payload = jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;

        // Récupérer les informations complètes de l'utilisateur depuis la base de données
        const user = await prisma.utilisateur.findUnique({
            where: { id: payload.id as string }
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
catch{
    return res.status(401).json({error: "Token invalide ou expiré "})
}

    }
}
export default AuthMiddleware ;