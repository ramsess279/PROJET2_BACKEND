export interface Payslip {
  id?: string;
  payRunId: string;
  employeId: string;
  salaireBrut: number;
  deductions?: number;
  salaireNet: number;
  statut?: string;
  dateGen?: Date;
  nombreJour?: number;
  nombreHeure?: number;
}