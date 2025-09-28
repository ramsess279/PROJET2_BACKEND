import type { PayRun } from "./payrun.entity.js";
declare const PayRunService: {
    create: (data: PayRun) => Promise<{
        id: string;
        periode: string;
        type: string;
        statut: string;
        dateCreation: Date;
        entrepriseId: string;
    }>;
    findById: (id: string) => Promise<{
        id: string;
        periode: string;
        type: string;
        statut: string;
        dateCreation: Date;
        entrepriseId: string;
    } | null>;
    findAll: () => Promise<{
        id: string;
        periode: string;
        type: string;
        statut: string;
        dateCreation: Date;
        entrepriseId: string;
    }[]>;
    update: (id: string, data: Partial<PayRun>) => Promise<{
        id: string;
        periode: string;
        type: string;
        statut: string;
        dateCreation: Date;
        entrepriseId: string;
    }>;
    delete: (id: string) => Promise<{
        id: string;
        periode: string;
        type: string;
        statut: string;
        dateCreation: Date;
        entrepriseId: string;
    }>;
};
export default PayRunService;
//# sourceMappingURL=payrun.service.d.ts.map