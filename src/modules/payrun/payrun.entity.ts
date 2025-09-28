export interface PayRun {
  id?: string;
  entrepriseId: string;
  periode: string;
  type: string;
  statut?: string;
  dateCreation?: Date;
}