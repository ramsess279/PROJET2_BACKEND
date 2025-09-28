import type { NextFunction , Request , Response } from "express";
import jwt , {type JwtPayload} from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request{
            user?: JwtPayload;
        }
    }
}


const AuthMiddleware = {
    TokenVerifed: (req: Request , res: Response , next: NextFunction)=> {

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


        req.user = payload;
        next();

}
catch{
    return res.status(401).json({error: "Token invalide ou expiré "})
}

    }
}
export default AuthMiddleware ;