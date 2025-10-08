import type { Payslip } from "./payslip.entity.js";
declare const PayslipModel: {
    create: (data: Payslip) => import(".prisma/client").Prisma.Prisma__PayslipClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById: (id: string) => import(".prisma/client").Prisma.Prisma__PayslipClient<({
        employe: {
            entreprise: {
                id: string;
                nom: string;
                adresse: string | null;
                latitude: number | null;
                longitude: number | null;
                email: string;
                telephone: string | null;
                logoUrl: string | null;
                devise: string;
                typePeriode: string;
                couleurPrimaire: string | null;
                couleurSecondaire: string | null;
                typographie: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
        payRun: {
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
        };
        paiements: {
            id: string;
            statut: string;
            montant: number;
            mode: string;
            datePaiement: Date;
            recuUrl: string | null;
            payslipId: string;
        }[];
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
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findByIdWithRelations: (id: string) => import(".prisma/client").Prisma.Prisma__PayslipClient<({
        employe: {
            entreprise: {
                id: string;
                nom: string;
                adresse: string | null;
                latitude: number | null;
                longitude: number | null;
                email: string;
                telephone: string | null;
                logoUrl: string | null;
                devise: string;
                typePeriode: string;
                couleurPrimaire: string | null;
                couleurSecondaire: string | null;
                typographie: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
        payRun: {
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
        };
        paiements: {
            id: string;
            statut: string;
            montant: number;
            mode: string;
            datePaiement: Date;
            recuUrl: string | null;
            payslipId: string;
        }[];
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
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll: (params?: {
        employeId?: string;
        payrunId?: string;
        statut?: string;
        page?: number;
        limit?: number;
        entrepriseId?: string;
    }) => import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    findByEmploye: (employeId: string) => import(".prisma/client").Prisma.PrismaPromise<({
        employe: {
            entreprise: {
                id: string;
                nom: string;
                adresse: string | null;
                latitude: number | null;
                longitude: number | null;
                email: string;
                telephone: string | null;
                logoUrl: string | null;
                devise: string;
                typePeriode: string;
                couleurPrimaire: string | null;
                couleurSecondaire: string | null;
                typographie: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
        payRun: {
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
        };
        paiements: {
            id: string;
            statut: string;
            montant: number;
            mode: string;
            datePaiement: Date;
            recuUrl: string | null;
            payslipId: string;
        }[];
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
    })[]>;
    findByPayrun: (payrunId: string) => import(".prisma/client").Prisma.PrismaPromise<({
        employe: {
            entreprise: {
                id: string;
                nom: string;
                adresse: string | null;
                latitude: number | null;
                longitude: number | null;
                email: string;
                telephone: string | null;
                logoUrl: string | null;
                devise: string;
                typePeriode: string;
                couleurPrimaire: string | null;
                couleurSecondaire: string | null;
                typographie: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
        payRun: {
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
        };
        paiements: {
            id: string;
            statut: string;
            montant: number;
            mode: string;
            datePaiement: Date;
            recuUrl: string | null;
            payslipId: string;
        }[];
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
    })[]>;
    update: (id: string, data: Partial<Payslip>) => import(".prisma/client").Prisma.Prisma__PayslipClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete: (id: string) => import(".prisma/client").Prisma.Prisma__PayslipClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
};
export default PayslipModel;
//# sourceMappingURL=payslip.model.d.ts.map