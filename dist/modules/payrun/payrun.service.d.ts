import type { PayRun, CreatePayRun } from "./payrun.entity.js";
declare const PayRunService: {
    create: (data: CreatePayRun) => Promise<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    }>;
    findById: (id: string) => Promise<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    } | null>;
    findAll: (params?: {
        entrepriseId?: string;
    }) => Promise<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    }[]>;
    update: (id: string, data: Partial<PayRun>) => Promise<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    }>;
    delete: (id: string) => Promise<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    }>;
    approve: (id: string) => Promise<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    }>;
    generatePayslips: (id: string, force?: boolean) => Promise<number>;
};
export default PayRunService;
//# sourceMappingURL=payrun.service.d.ts.map