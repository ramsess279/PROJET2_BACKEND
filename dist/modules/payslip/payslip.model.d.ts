import type { Payslip } from "./payslip.entity.js";
declare const PayslipModel: {
    create: (data: Payslip) => import(".prisma/client").Prisma.Prisma__PayslipClient<{
        id: string;
        salaireBrut: number;
        deductions: number;
        salaireNet: number;
        statut: string;
        dateGen: Date;
        payRunId: string;
        employeId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById: (id: string) => import(".prisma/client").Prisma.Prisma__PayslipClient<{
        id: string;
        salaireBrut: number;
        deductions: number;
        salaireNet: number;
        statut: string;
        dateGen: Date;
        payRunId: string;
        employeId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll: () => import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        salaireBrut: number;
        deductions: number;
        salaireNet: number;
        statut: string;
        dateGen: Date;
        payRunId: string;
        employeId: string;
    }[]>;
    update: (id: string, data: Partial<Payslip>) => import(".prisma/client").Prisma.Prisma__PayslipClient<{
        id: string;
        salaireBrut: number;
        deductions: number;
        salaireNet: number;
        statut: string;
        dateGen: Date;
        payRunId: string;
        employeId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete: (id: string) => import(".prisma/client").Prisma.Prisma__PayslipClient<{
        id: string;
        salaireBrut: number;
        deductions: number;
        salaireNet: number;
        statut: string;
        dateGen: Date;
        payRunId: string;
        employeId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
};
export default PayslipModel;
//# sourceMappingURL=payslip.model.d.ts.map