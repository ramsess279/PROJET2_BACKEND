import type { Pointage, Presence } from "./pointage.entity.js";
declare const PointageModel: {
    create: (data: Pointage) => Promise<{
        id: string;
        employeId: string;
        type: string;
        timestamp: Date;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        method: string;
        deviceId: string | null;
        photoUrl: string | null;
        ipAddress: string | null;
        verified: boolean;
        notes: string | null;
    }>;
    findById: (id: string) => Promise<({
        employe: {
            id: string;
            email: string | null;
            telephone: string | null;
            nomComplet: string;
            statut: string;
            entrepriseId: string;
            poste: string;
            postePersonnalise: string | null;
            typeContrat: string;
            salaireBase: number;
            nombreHeures: number | null;
            nombreJours: number | null;
            coordonneeBancaire: string | null;
            dateEmbauche: Date | null;
            dateFin: Date | null;
            situationMatrimoniale: string | null;
            nationalite: string | null;
        };
    } & {
        id: string;
        employeId: string;
        type: string;
        timestamp: Date;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        method: string;
        deviceId: string | null;
        photoUrl: string | null;
        ipAddress: string | null;
        verified: boolean;
        notes: string | null;
    }) | null>;
    findAll: (params?: {
        employeId?: string;
        entrepriseId?: string;
        date?: Date;
        startDate?: Date;
        endDate?: Date;
        method?: string;
        verified?: boolean;
    }) => Promise<({
        employe: {
            id: string;
            email: string | null;
            telephone: string | null;
            nomComplet: string;
            statut: string;
            entrepriseId: string;
            poste: string;
            postePersonnalise: string | null;
            typeContrat: string;
            salaireBase: number;
            nombreHeures: number | null;
            nombreJours: number | null;
            coordonneeBancaire: string | null;
            dateEmbauche: Date | null;
            dateFin: Date | null;
            situationMatrimoniale: string | null;
            nationalite: string | null;
        };
    } & {
        id: string;
        employeId: string;
        type: string;
        timestamp: Date;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        method: string;
        deviceId: string | null;
        photoUrl: string | null;
        ipAddress: string | null;
        verified: boolean;
        notes: string | null;
    })[]>;
    update: (id: string, data: Partial<Pointage>) => Promise<{
        id: string;
        employeId: string;
        type: string;
        timestamp: Date;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        method: string;
        deviceId: string | null;
        photoUrl: string | null;
        ipAddress: string | null;
        verified: boolean;
        notes: string | null;
    }>;
    delete: (id: string) => Promise<{
        id: string;
        employeId: string;
        type: string;
        timestamp: Date;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        method: string;
        deviceId: string | null;
        photoUrl: string | null;
        ipAddress: string | null;
        verified: boolean;
        notes: string | null;
    }>;
};
declare const PresenceModel: {
    create: (data: Presence) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        employeId: string;
        date: Date;
        heuresTravaillees: number;
    }>;
    findById: (id: string) => Promise<({
        employe: {
            id: string;
            email: string | null;
            telephone: string | null;
            nomComplet: string;
            statut: string;
            entrepriseId: string;
            poste: string;
            postePersonnalise: string | null;
            typeContrat: string;
            salaireBase: number;
            nombreHeures: number | null;
            nombreJours: number | null;
            coordonneeBancaire: string | null;
            dateEmbauche: Date | null;
            dateFin: Date | null;
            situationMatrimoniale: string | null;
            nationalite: string | null;
        };
        pointages: {
            id: string;
            employeId: string;
            type: string;
            timestamp: Date;
            location: import("@prisma/client/runtime/library").JsonValue | null;
            method: string;
            deviceId: string | null;
            photoUrl: string | null;
            ipAddress: string | null;
            verified: boolean;
            notes: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        employeId: string;
        date: Date;
        heuresTravaillees: number;
    }) | null>;
    findByEmployeAndDate: (employeId: string, date: Date) => Promise<({
        employe: {
            id: string;
            email: string | null;
            telephone: string | null;
            nomComplet: string;
            statut: string;
            entrepriseId: string;
            poste: string;
            postePersonnalise: string | null;
            typeContrat: string;
            salaireBase: number;
            nombreHeures: number | null;
            nombreJours: number | null;
            coordonneeBancaire: string | null;
            dateEmbauche: Date | null;
            dateFin: Date | null;
            situationMatrimoniale: string | null;
            nationalite: string | null;
        };
        pointages: {
            id: string;
            employeId: string;
            type: string;
            timestamp: Date;
            location: import("@prisma/client/runtime/library").JsonValue | null;
            method: string;
            deviceId: string | null;
            photoUrl: string | null;
            ipAddress: string | null;
            verified: boolean;
            notes: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        employeId: string;
        date: Date;
        heuresTravaillees: number;
    }) | null>;
    findAll: (params?: {
        employeId?: string;
        startDate?: Date;
        endDate?: Date;
        statut?: string;
    }) => Promise<({
        employe: {
            id: string;
            email: string | null;
            telephone: string | null;
            nomComplet: string;
            statut: string;
            entrepriseId: string;
            poste: string;
            postePersonnalise: string | null;
            typeContrat: string;
            salaireBase: number;
            nombreHeures: number | null;
            nombreJours: number | null;
            coordonneeBancaire: string | null;
            dateEmbauche: Date | null;
            dateFin: Date | null;
            situationMatrimoniale: string | null;
            nationalite: string | null;
        };
        pointages: {
            id: string;
            employeId: string;
            type: string;
            timestamp: Date;
            location: import("@prisma/client/runtime/library").JsonValue | null;
            method: string;
            deviceId: string | null;
            photoUrl: string | null;
            ipAddress: string | null;
            verified: boolean;
            notes: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        employeId: string;
        date: Date;
        heuresTravaillees: number;
    })[]>;
    update: (id: string, data: Partial<Presence>) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        employeId: string;
        date: Date;
        heuresTravaillees: number;
    }>;
    upsert: (employeId: string, date: Date, data: Partial<Presence>) => Promise<{
        employe: {
            id: string;
            email: string | null;
            telephone: string | null;
            nomComplet: string;
            statut: string;
            entrepriseId: string;
            poste: string;
            postePersonnalise: string | null;
            typeContrat: string;
            salaireBase: number;
            nombreHeures: number | null;
            nombreJours: number | null;
            coordonneeBancaire: string | null;
            dateEmbauche: Date | null;
            dateFin: Date | null;
            situationMatrimoniale: string | null;
            nationalite: string | null;
        };
        pointages: {
            id: string;
            employeId: string;
            type: string;
            timestamp: Date;
            location: import("@prisma/client/runtime/library").JsonValue | null;
            method: string;
            deviceId: string | null;
            photoUrl: string | null;
            ipAddress: string | null;
            verified: boolean;
            notes: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        employeId: string;
        date: Date;
        heuresTravaillees: number;
    }>;
    delete: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        employeId: string;
        date: Date;
        heuresTravaillees: number;
    }>;
    calculateWorkedHours: (employeId: string, date: Date) => Promise<number>;
};
export { PointageModel, PresenceModel };
export default PointageModel;
//# sourceMappingURL=pointage.model.d.ts.map