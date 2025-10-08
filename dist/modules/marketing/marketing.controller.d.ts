import express from 'express';
type Request = express.Request;
type Response = express.Response;
export declare class MarketingController {
    static getAllContent(req: Request, res: Response): Promise<void>;
    static getContentBySection(req: Request, res: Response): Promise<Response | undefined>;
    static getStats(req: Request, res: Response): Promise<void>;
    static getBenefits(req: Request, res: Response): Promise<void>;
    static getHeroContent(req: Request, res: Response): Promise<void>;
    static getCTAContent(req: Request, res: Response): Promise<void>;
}
export {};
//# sourceMappingURL=marketing.controller.d.ts.map