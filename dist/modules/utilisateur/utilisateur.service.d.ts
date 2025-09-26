import type { Utilisateur } from "@prisma/client";
declare const UserService: {
    create: (data: Utilisateur) => Promise<{
        id: string;
        nomComplet: string;
        email: string;
        telephone: string;
        motDePasse: string;
        role: string;
        statut: string;
        createdAt: Date;
        entrepriseId: string | null;
    }>;
    findById: (id: string) => Promise<{
        id: string;
        nomComplet: string;
        email: string;
        telephone: string;
        motDePasse: string;
        role: string;
        statut: string;
        createdAt: Date;
        entrepriseId: string | null;
    } | null>;
    findAll: () => Promise<{
        id: string;
        nomComplet: string;
        email: string;
        telephone: string;
        motDePasse: string;
        role: string;
        statut: string;
        createdAt: Date;
        entrepriseId: string | null;
    }[]>;
    update: (id: string, data: Utilisateur) => Promise<void>;
    delete: (id: string) => Promise<void>;
};
export default UserService;
//# sourceMappingURL=utilisateur.service.d.ts.map