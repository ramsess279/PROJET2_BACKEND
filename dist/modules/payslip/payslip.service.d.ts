declare const PayslipService: {
    findAll: (params?: {
        employeId?: string;
        payrunId?: string;
        statut?: string;
        page?: number;
        limit?: number;
        entrepriseId?: string;
    }) => Promise<{
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
    findById: (id: string) => Promise<({
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
    }) | null>;
    create: (data: any) => Promise<{
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
    }>;
    update: (id: string, data: any) => Promise<{
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
    }>;
    delete: (id: string) => Promise<{
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
    }>;
    findByEmploye: (employeId: string) => Promise<({
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
    findByPayrun: (payrunId: string) => Promise<({
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
    generatePDF: (payslipId: string) => Promise<Buffer<ArrayBuffer>>;
};
export { PayslipService };
export default PayslipService;
//# sourceMappingURL=payslip.service.d.ts.map