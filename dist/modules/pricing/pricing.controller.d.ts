import express from 'express';
type Request = express.Request;
type Response = express.Response;
export declare class PricingController {
    static findAll(req: Request, res: Response): Promise<void>;
    static findById(req: Request, res: Response): Promise<Response | undefined>;
    static create(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<Response | undefined>;
    static delete(req: Request, res: Response): Promise<Response | undefined>;
    static toggleActive(req: Request, res: Response): Promise<Response | undefined>;
    static findActive(req: Request, res: Response): Promise<void>;
    static findPopular(req: Request, res: Response): Promise<void>;
}
export {};
//# sourceMappingURL=pricing.controller.d.ts.map