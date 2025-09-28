import type { Employe } from "./employe.entity.js";
declare const EmployeService: {
    create: (data: Employe) => Promise<{
        id: string;
        nomComplet: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        email: string | null;
        telephone: string | null;
        statut: string;
        dateEmbauche: Date | null;
        dateFin: Date | null;
        entrepriseId: string;
    }>;
    findById: (id: string) => Promise<{
        id: string;
        nomComplet: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        email: string | null;
        telephone: string | null;
        statut: string;
        dateEmbauche: Date | null;
        dateFin: Date | null;
        entrepriseId: string;
    } | null>;
    findAll: () => Promise<{
        id: string;
        nomComplet: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        email: string | null;
        telephone: string | null;
        statut: string;
        dateEmbauche: Date | null;
        dateFin: Date | null;
        entrepriseId: string;
    }[]>;
    update: (id: string, data: Partial<Employe>) => Promise<{
        id: string;
        nomComplet: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        email: string | null;
        telephone: string | null;
        statut: string;
        dateEmbauche: Date | null;
        dateFin: Date | null;
        entrepriseId: string;
    }>;
    delete: (id: string) => Promise<{
        id: string;
        nomComplet: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        email: string | null;
        telephone: string | null;
        statut: string;
        dateEmbauche: Date | null;
        dateFin: Date | null;
        entrepriseId: string;
    }>;
};
export default EmployeService;
//# sourceMappingURL=employe.service.d.ts.map