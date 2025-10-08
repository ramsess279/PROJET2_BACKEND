import type { NextFunction, Request, Response } from "express";
import { type JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
declare const AuthMiddleware: {
    TokenVerifed: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default AuthMiddleware;
//# sourceMappingURL=auth.middelware.d.ts.map