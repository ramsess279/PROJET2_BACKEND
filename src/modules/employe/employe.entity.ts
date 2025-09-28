export interface Employe {
  id?: string;
  entrepriseId: string;
  nomComplet: string;
  poste?: string;
  typeContrat: string;
  salaireBase: number;
  coordonneeBancaire?: string;
  email?: string;
  telephone?: string;
  statut?: string;
  dateEmbauche?: Date;
  dateFin?: Date;
  situationMatrimoniale?: string;
  nationalite?: string;
}