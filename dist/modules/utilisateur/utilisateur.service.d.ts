import type { Utilisateur } from "@prisma/client";
declare const UserService: {
    create: (data: Utilisateur) => Promise<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        motDePasseTemporaire: string | null;
        role: string;
        statut: string;
        entrepriseId: string | null;
        employeId: string | null;
    }>;
    findById: (id: string) => Promise<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        motDePasseTemporaire: string | null;
        role: string;
        statut: string;
        entrepriseId: string | null;
        employeId: string | null;
    } | null>;
    findAll: (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        role?: string;
        entrepriseId?: string;
        includeEmployeeUsers?: boolean;
    }) => Promise<({
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
        } | null;
    } & {
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        motDePasseTemporaire: string | null;
        role: string;
        statut: string;
        entrepriseId: string | null;
        employeId: string | null;
    })[]>;
    count: (params?: {
        search?: string;
        status?: string;
        role?: string;
        entrepriseId?: string;
        includeEmployeeUsers?: boolean;
    }) => Promise<number>;
    findByEntrepriseId: (entrepriseId: string) => Promise<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        motDePasseTemporaire: string | null;
        role: string;
        statut: string;
        entrepriseId: string | null;
        employeId: string | null;
    }[]>;
    findAdminByEntrepriseId: (entrepriseId: string) => Promise<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        motDePasseTemporaire: string | null;
        role: string;
        statut: string;
        entrepriseId: string | null;
        employeId: string | null;
    } | null>;
    update: (id: string, data: Utilisateur) => Promise<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        motDePasseTemporaire: string | null;
        role: string;
        statut: string;
        entrepriseId: string | null;
        employeId: string | null;
    }>;
    changePassword: (id: string, newPassword: string) => Promise<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        motDePasseTemporaire: string | null;
        role: string;
        statut: string;
        entrepriseId: string | null;
        employeId: string | null;
    }>;
    delete: (id: string) => Promise<void>;
};
export default UserService;
//# sourceMappingURL=utilisateur.service.d.ts.map