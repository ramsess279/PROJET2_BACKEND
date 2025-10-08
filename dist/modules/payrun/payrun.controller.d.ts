import type { Request, Response } from "express";
declare const PayRunController: {
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    findById: (req: Request, res: Response) => Promise<void>;
    findAll: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    approve: (req: Request, res: Response) => Promise<void>;
    generatePayslips: (req: Request, res: Response) => Promise<void>;
};
export default PayRunController;
//# sourceMappingURL=payrun.controller.d.ts.map