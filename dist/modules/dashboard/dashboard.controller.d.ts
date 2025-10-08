import express from 'express';
type Request = express.Request;
type Response = express.Response;
export declare class DashboardController {
    static getDashboardData(req: Request, res: Response): Promise<void>;
    static getStats(req: Request, res: Response): Promise<void>;
    static getFrequencyEvolution(req: Request, res: Response): Promise<void>;
    static getUpcomingPayments(req: Request, res: Response): Promise<void>;
}
export {};
//# sourceMappingURL=dashboard.controller.d.ts.map