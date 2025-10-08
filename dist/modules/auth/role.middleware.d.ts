import type { Request, Response, NextFunction } from "express";
export declare function requireRole(role: string): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare function canAccessCompany(): (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare function canModifyCompany(): (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=role.middleware.d.ts.map