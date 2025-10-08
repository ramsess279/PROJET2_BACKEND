import type { Paiement } from "./paiement.entity.js";
declare const PaiementService: {
    create: (data: Paiement) => Promise<{
        id: string;
        statut: string;
        montant: number;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        payslipId: string;
    }>;
    findById: (id: string) => Promise<{
        id: string;
        statut: string;
        montant: number;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        payslipId: string;
    } | null>;
    findAll: (params?: {
        entrepriseId?: string;
    }) => Promise<({
        payslip: {
            employe: {
                id: string;
                email: string | null;
                telephone: string | null;
                nomComplet: string;
                statut: string;
                entrepriseId: string;
                poste: string;
                postePersonnalise: string | null;
                typeContrat: string;
                salaireBase: number;
                nombreHeures: number | null;
                nombreJours: number | null;
                coordonneeBancaire: string | null;
                dateEmbauche: Date | null;
                dateFin: Date | null;
                situationMatrimoniale: string | null;
                nationalite: string | null;
            };
        } & {
            id: string;
            statut: string;
            employeId: string;
            salaireBrut: number;
            deductions: number;
            salaireNet: number;
            dateGen: Date;
            nombreJour: number | null;
            nombreHeure: number | null;
            payRunId: string;
        };
    } & {
        id: string;
        statut: string;
        montant: number;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        payslipId: string;
    })[]>;
    update: (id: string, data: Partial<Paiement>) => Promise<{
        id: string;
        statut: string;
        montant: number;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        payslipId: string;
    }>;
    delete: (id: string) => Promise<{
        id: string;
        statut: string;
        montant: number;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        payslipId: string;
    }>;
    generateReceipt: (paiementId: string) => Promise<Buffer<ArrayBuffer>>;
};
export default PaiementService;
//# sourceMappingURL=paiement.service.d.ts.map