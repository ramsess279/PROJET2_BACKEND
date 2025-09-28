import type { Paiement } from "./paiement.entity.js";
declare const PaiementService: {
    create: (data: Paiement) => Promise<{
        id: string;
        montant: number;
        nombreJour: number | null;
        nombreHeure: number | null;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        statut: string;
        payslipId: string;
    }>;
    findById: (id: string) => Promise<{
        id: string;
        montant: number;
        nombreJour: number | null;
        nombreHeure: number | null;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        statut: string;
        payslipId: string;
    } | null>;
    findAll: () => Promise<{
        id: string;
        montant: number;
        nombreJour: number | null;
        nombreHeure: number | null;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        statut: string;
        payslipId: string;
    }[]>;
    update: (id: string, data: Partial<Paiement>) => Promise<{
        id: string;
        montant: number;
        nombreJour: number | null;
        nombreHeure: number | null;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        statut: string;
        payslipId: string;
    }>;
    delete: (id: string) => Promise<{
        id: string;
        montant: number;
        nombreJour: number | null;
        nombreHeure: number | null;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        statut: string;
        payslipId: string;
    }>;
};
export default PaiementService;
//# sourceMappingURL=paiement.service.d.ts.map