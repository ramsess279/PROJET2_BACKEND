export interface Pointage {
    id?: string;
    employeId: string;
    type: 'entree' | 'sortie' | 'pause' | 'reprise';
    timestamp?: Date;
    location?: {
        lat: number;
        lng: number;
    };
    method: 'gps' | 'qr' | 'beacon' | 'facial' | 'manual';
    deviceId?: string;
    photoUrl?: string;
    ipAddress?: string;
    verified?: boolean;
    notes?: string;
}
export interface Presence {
    id?: string;
    employeId: string;
    date: Date;
    heuresTravaillees?: number;
    statut?: 'present' | 'absent' | 'conge' | 'maladie' | 'ferie';
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=pointage.entity.d.ts.map