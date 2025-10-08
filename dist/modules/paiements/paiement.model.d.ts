import type { Paiement } from "./paiement.entity.js";
declare const PaiementModel: {
    create: (data: Paiement) => import(".prisma/client").Prisma.Prisma__PaiementClient<{
        id: string;
        statut: string;
        montant: number;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        payslipId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById: (id: string) => import(".prisma/client").Prisma.Prisma__PaiementClient<{
        id: string;
        statut: string;
        montant: number;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        payslipId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findByIdWithRelations: (id: string) => import(".prisma/client").Prisma.Prisma__PaiementClient<({
        payslip: {
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
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll: (params?: {
        entrepriseId?: string;
    }) => import(".prisma/client").Prisma.PrismaPromise<({
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
    update: (id: string, data: Partial<Paiement>) => import(".prisma/client").Prisma.Prisma__PaiementClient<{
        id: string;
        statut: string;
        montant: number;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        payslipId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete: (id: string) => import(".prisma/client").Prisma.Prisma__PaiementClient<{
        id: string;
        statut: string;
        montant: number;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        payslipId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
};
export default PaiementModel;
//# sourceMappingURL=paiement.model.d.ts.map