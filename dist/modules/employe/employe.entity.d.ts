export interface Employe {
    id?: string;
    entrepriseId: string;
    nomComplet: string;
    poste?: string;
    postePersonnalise?: string;
    typeContrat: string;
    salaireBase: number;
    nombreHeures?: number;
    nombreJours?: number;
    coordonneeBancaire?: string;
    email?: string;
    telephone?: string;
    statut?: string;
    dateEmbauche?: Date;
    dateFin?: Date;
    situationMatrimoniale?: string;
    nationalite?: string;
}
//# sourceMappingURL=employe.entity.d.ts.map