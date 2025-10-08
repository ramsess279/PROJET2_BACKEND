import type { Pointage } from "./pointage.entity.js";
declare const PointageService: {
    findAll: (params?: {
        employeId?: string;
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
    findByEmploye: (employeId: string, startDate?: Date, endDate?: Date) => Promise<({
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
    findByEntreprise: (entrepriseId: string, startDate?: Date, endDate?: Date) => Promise<({
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
    findTodayByEmploye: (employeId: string) => Promise<({
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
    canCheckIn: (employeId: string, location?: {
        lat: number;
        lng: number;
    }) => Promise<{
        canCheckIn: boolean;
        reason: string;
    } | {
        canCheckIn: boolean;
        reason?: never;
    }>;
    generateQRCode: (employeId: string, entrepriseId: string) => Promise<{
        qrCode: string;
        expiresAt: number;
    }>;
    generateCompanyQRCode: (entrepriseId: string) => Promise<{
        qrCode: string;
        qrData: string;
        expiresAt: number;
        entrepriseId: string;
    }>;
    validateQRCode: (qrString: string, location?: {
        lat: number;
        lng: number;
    }) => Promise<{
        success: boolean;
        pointage: {
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
        };
        error?: never;
    } | {
        success: boolean;
        error: string;
        pointage?: never;
    }>;
    getStats: (employeId?: string, startDate?: Date, endDate?: Date) => Promise<{
        totalPointages: number;
        byMethod: Record<string, number>;
        byType: Record<string, number>;
        averagePerDay: number;
    }>;
};
declare const PresenceService: {
    findByEmploye: (employeId: string, startDate?: Date, endDate?: Date) => Promise<({
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
    calculateMonthlyHours: (employeId: string, year: number, month: number) => Promise<{
        totalHours: number;
        workedDays: number;
        absences: number;
        presences: number;
    }>;
    markAbsence: (employeId: string, date: Date, reason: string) => Promise<{
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
    markLeave: (employeId: string, date: Date, type: "conge" | "maladie" | "ferie") => Promise<{
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
};
export { PointageService, PresenceService };
export default PointageService;
//# sourceMappingURL=pointage.service.d.ts.map