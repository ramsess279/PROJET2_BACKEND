import type { Request, Response } from "express";
declare const UserController: {
    create: (req: Request, res: Response) => Promise<void>;
    findById: (req: Request, res: Response) => Promise<void>;
    findAll: (_req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
};
export default UserController;
//# sourceMappingURL=utilisateur.controller.d.ts.map