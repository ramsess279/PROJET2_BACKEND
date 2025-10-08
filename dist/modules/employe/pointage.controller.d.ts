import type { Request, Response } from "express";
declare const PointageController: {
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    findAll: (req: Request, res: Response) => Promise<void>;
    findByEmploye: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    findByEntreprise: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    generateQRCode: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    generateCompanyQRCode: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    validateQRCode: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    canCheckIn: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getStats: (req: Request, res: Response) => Promise<void>;
    generateAttendanceReport: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
declare const PresenceController: {
    findByEmploye: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    calculateMonthlyHours: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    markAbsence: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    markLeave: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export { PointageController, PresenceController };
export default PointageController;
//# sourceMappingURL=pointage.controller.d.ts.map