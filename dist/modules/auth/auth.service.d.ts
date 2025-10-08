import type { Utilisateur } from "@prisma/client";
declare const AuthService: {
    register: (data: Utilisateur) => Promise<{
        user: {
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
        };
        token: string;
    }>;
    login: (email: string, motDePasse: string) => Promise<{
        user: {
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
        };
        token: string;
    }>;
};
export default AuthService;
//# sourceMappingURL=auth.service.d.ts.map