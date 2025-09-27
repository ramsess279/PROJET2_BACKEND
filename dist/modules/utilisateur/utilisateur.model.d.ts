import type { Utilisateur } from "./utilisateur.entity.js";
declare const UserModel: {
    create: (data: Utilisateur) => import(".prisma/client").Prisma.Prisma__UtilisateurClient<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        role: string;
        statut: string;
        entrepriseId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById: (id: string) => import(".prisma/client").Prisma.Prisma__UtilisateurClient<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        role: string;
        statut: string;
        entrepriseId: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll: () => import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        role: string;
        statut: string;
        entrepriseId: string | null;
    }[]>;
    update: (id: string, data: Partial<Utilisateur>) => void;
    delete: (id: string) => void;
};
export default UserModel;
//# sourceMappingURL=utilisateur.model.d.ts.map