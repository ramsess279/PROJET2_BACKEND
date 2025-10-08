import type { Request, Response } from "express";
declare const PayslipController: {
    create: (req: Request, res: Response) => Promise<void>;
    findById: (req: Request, res: Response) => Promise<void>;
    findAll: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    findByPayrun: (req: Request, res: Response) => Promise<void>;
    download: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default PayslipController;
//# sourceMappingURL=payslip.controller.d.ts.map