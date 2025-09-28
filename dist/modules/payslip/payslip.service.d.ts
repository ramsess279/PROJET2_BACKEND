import type { Payslip } from "./payslip.entity.js";
declare const PayslipService: {
    create: (data: Payslip) => Promise<{
        id: string;
        salaireBrut: number;
        deductions: number;
        salaireNet: number;
        statut: string;
        dateGen: Date;
        payRunId: string;
        employeId: string;
    }>;
    findById: (id: string) => Promise<{
        id: string;
        salaireBrut: number;
        deductions: number;
        salaireNet: number;
        statut: string;
        dateGen: Date;
        payRunId: string;
        employeId: string;
    } | null>;
    findAll: () => Promise<{
        id: string;
        salaireBrut: number;
        deductions: number;
        salaireNet: number;
        statut: string;
        dateGen: Date;
        payRunId: string;
        employeId: string;
    }[]>;
    update: (id: string, data: Partial<Payslip>) => Promise<{
        id: string;
        salaireBrut: number;
        deductions: number;
        salaireNet: number;
        statut: string;
        dateGen: Date;
        payRunId: string;
        employeId: string;
    }>;
    delete: (id: string) => Promise<{
        id: string;
        salaireBrut: number;
        deductions: number;
        salaireNet: number;
        statut: string;
        dateGen: Date;
        payRunId: string;
        employeId: string;
    }>;
};
export default PayslipService;
//# sourceMappingURL=payslip.service.d.ts.map