import type { Utilisateur } from "@prisma/client";
declare const AuthService: {
    register: (data: Utilisateur) => Promise<{
        user: {
            id: string;
            entrepriseId: string | null;
            nomComplet: string;
            email: string;
            telephone: string;
            motDePasse: string;
            role: string;
            statut: string;
            createdAt: Date;
        };
        token: string;
    }>;
    login: (email: string, motDePasse: string) => Promise<{
        user: {
            id: string;
            entrepriseId: string | null;
            nomComplet: string;
            email: string;
            telephone: string;
            motDePasse: string;
            role: string;
            statut: string;
            createdAt: Date;
        };
        token: string;
    }>;
};
export default AuthService;
//# sourceMappingURL=auth.service.d.ts.map