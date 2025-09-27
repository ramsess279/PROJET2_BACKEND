import type { Employe } from "./employe.entity.js";
declare const EmployeService: {
    create: (data: Employe) => Promise<{
        id: string;
        email: string | null;
        telephone: string | null;
        nomComplet: string;
        statut: string;
        entrepriseId: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        dateEmbauche: Date | null;
        dateFin: Date | null;
    }>;
    findById: (id: string) => Promise<{
        id: string;
        email: string | null;
        telephone: string | null;
        nomComplet: string;
        statut: string;
        entrepriseId: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        dateEmbauche: Date | null;
        dateFin: Date | null;
    } | null>;
    findAll: () => Promise<{
        id: string;
        email: string | null;
        telephone: string | null;
        nomComplet: string;
        statut: string;
        entrepriseId: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        dateEmbauche: Date | null;
        dateFin: Date | null;
    }[]>;
    update: (id: string, data: Partial<Employe>) => Promise<{
        id: string;
        email: string | null;
        telephone: string | null;
        nomComplet: string;
        statut: string;
        entrepriseId: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        dateEmbauche: Date | null;
        dateFin: Date | null;
    }>;
    delete: (id: string) => Promise<{
        id: string;
        email: string | null;
        telephone: string | null;
        nomComplet: string;
        statut: string;
        entrepriseId: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        dateEmbauche: Date | null;
        dateFin: Date | null;
    }>;
};
export default EmployeService;
//# sourceMappingURL=employe.service.d.ts.map