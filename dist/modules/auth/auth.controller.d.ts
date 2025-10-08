import type { Request, Response } from "express";
declare const AuthController: {
    register: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    logout: (_req: Request, res: Response) => Promise<void>;
    refresh: (_req: Request, res: Response) => Promise<void>;
    switchCompany: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default AuthController;
//# sourceMappingURL=auth.controller.d.ts.map