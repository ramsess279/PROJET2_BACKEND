export interface Paiement {
  id?: string;
  payslipId: string;
  montant: number;
  mode: string;
  datePaiement?: Date;
  recuUrl?: string;
  statut?: string;
}