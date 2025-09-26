export interface Utilisateur {
    id?: string;
    entrepriseId?: string | null;
    nomComplet: string;
    email: string;
    telephone: string;
    motDePasse: string;
    role: string;
    statut?: string;
    createdAt?: Date;
}
//# sourceMappingURL=utilisateur.entity.d.ts.map