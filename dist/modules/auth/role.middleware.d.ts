import type { Request, Response, NextFunction } from "express";
export declare function requireRole(role: string): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=role.middleware.d.ts.map