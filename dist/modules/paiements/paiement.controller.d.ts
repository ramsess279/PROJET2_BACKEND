import type { Request, Response } from "express";
declare const PaiementController: {
    create: (req: Request, res: Response) => Promise<void>;
    findById: (req: Request, res: Response) => Promise<void>;
    findAll: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    downloadReceipt: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default PaiementController;
//# sourceMappingURL=paiement.controller.d.ts.map