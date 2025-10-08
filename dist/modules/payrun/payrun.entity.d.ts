export interface PayRun {
    id?: string;
    entrepriseId: string;
    periode: string;
    type: string;
    statut: string;
    dateCreation?: Date;
    dateDebut: Date | null;
    dateFin: Date | null;
    heureDebut: string | null;
    heureFin: string | null;
}
export interface CreatePayRun {
    entrepriseId: string;
    periode: string;
    type: string;
    statut?: string;
    dateDebut?: string;
    dateFin?: string;
    heureDebut?: string;
    heureFin?: string;
}
//# sourceMappingURL=payrun.entity.d.ts.map