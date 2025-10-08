import type { Request, Response } from 'express';
declare const EntrepriseController: {
    requestCreation: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    findById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    findAll: (_req: Request, res: Response) => Promise<void>;
    findAllPublic: (_req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getRequests: (_req: Request, res: Response) => Promise<void>;
    approveRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    rejectRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default EntrepriseController;
//# sourceMappingURL=entreprise.controller.d.ts.map