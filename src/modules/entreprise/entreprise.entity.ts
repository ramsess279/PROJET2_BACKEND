export interface Entreprise {
  id?: string;
  nom: string;
  adresse?: string;
  latitude?: number;
  longitude?: number;
  email: string;
  telephone?: string;
  logoUrl?: string;
  devise?: string;
  typePeriode?: string;
  couleurPrimaire?: string;
  couleurSecondaire?: string;
  typographie?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

 