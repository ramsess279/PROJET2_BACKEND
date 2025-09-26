export interface Employe {
  id?: string;
  entrepriseId: string;
  nomComplet: string;
  poste?: string;
  typeContrat: string;
  salaireBase: number;
  coordonneeBancaire?: string;
  email?: string;
}