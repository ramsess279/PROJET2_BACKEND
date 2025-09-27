import type { Utilisateur } from "@prisma/client";
declare const UserService: {
    create: (data: Utilisateur) => Promise<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        role: string;
        statut: string;
        entrepriseId: string | null;
    }>;
    findById: (id: string) => Promise<{
        id: string;
        email: string;
        telephone: string;
        createdAt: Date;
        nomComplet: string;
        motDePasse: string;
        role: string;
        statut: string;
        entrepriseId: string | null;
    } | null>;
    findAll: () => Promise<{
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
    update: (id: string, data: Utilisateur) => Promise<void>;
    delete: (id: string) => Promise<void>;
};
export default UserService;
//# sourceMappingURL=utilisateur.service.d.ts.map