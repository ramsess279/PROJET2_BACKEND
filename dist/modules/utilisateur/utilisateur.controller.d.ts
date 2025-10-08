import type { Request, Response } from "express";
declare const UserController: {
    create: (req: Request, res: Response) => Promise<void>;
    findById: (req: Request, res: Response) => Promise<void>;
    findAll: (req: Request, res: Response) => Promise<void>;
    findByEntrepriseId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    findAdminByEntrepriseId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    changePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
};
export default UserController;
//# sourceMappingURL=utilisateur.controller.d.ts.map