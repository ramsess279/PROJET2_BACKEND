import type { Utilisateur } from "./utilisateur.entity.js";
declare const UserModel: {
    create: (data: Utilisateur) => import(".prisma/client").Prisma.Prisma__UtilisateurClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById: (id: string) => import(".prisma/client").Prisma.Prisma__UtilisateurClient<{
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
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll: (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        role?: string;
        entrepriseId?: string;
        includeEmployeeUsers?: boolean;
    }) => import(".prisma/client").Prisma.PrismaPromise<({
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
    }) => import(".prisma/client").Prisma.PrismaPromise<number>;
    findByEntrepriseId: (entrepriseId: string) => import(".prisma/client").Prisma.PrismaPromise<{
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
    findAdminByEntrepriseId: (entrepriseId: string) => import(".prisma/client").Prisma.Prisma__UtilisateurClient<{
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
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update: (id: string, data: Partial<Utilisateur>) => import(".prisma/client").Prisma.Prisma__UtilisateurClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete: (id: string) => void;
};
export default UserModel;
//# sourceMappingURL=utilisateur.model.d.ts.map