import { PointageModel, PresenceModel } from "./pointage.model.js";
// Fonction utilitaire pour calculer la distance entre deux points GPS (formule de Haversine)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
}
const PointageService = {
    // Récupérer tous les pointages avec filtres
    findAll: async (params) => {
        return PointageModel.findAll(params);
    },
    // Enregistrer un pointage
    create: async (data) => {
        console.log('PointageService.create - data:', data);
        // Validation de base
        if (!data.employeId || !data.type || !data.method) {
            throw new Error('Données de pointage incomplètes');
        }
        // Vérifications de sécurité
        if (data.method === 'gps' && !data.location) {
            throw new Error('Localisation GPS requise pour le pointage GPS');
        }
        // Vérifications anti-fraude
        const location = data.location;
        const canCheckInResult = await PointageService.canCheckIn(data.employeId, location);
        if (!canCheckInResult.canCheckIn) {
            throw new Error(canCheckInResult.reason || 'Pointage non autorisé');
        }
        // Créer le pointage
        const pointage = await PointageModel.create(data);
        // Mettre à jour ou créer la présence du jour
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Calculer les heures travaillées pour ce jour
        const workedHours = await PresenceModel.calculateWorkedHours(data.employeId, today);
        // Mettre à jour la présence
        await PresenceModel.upsert(data.employeId, today, {
            heuresTravaillees: workedHours,
            statut: workedHours > 0 ? 'present' : 'absent'
        });
        return pointage;
    },
    // Récupérer les pointages d'un employé
    findByEmploye: async (employeId, startDate, endDate) => {
        const params = { employeId };
        if (startDate)
            params.startDate = startDate;
        if (endDate)
            params.endDate = endDate;
        return PointageModel.findAll(params);
    },
    // Récupérer les pointages d'une entreprise
    findByEntreprise: async (entrepriseId, startDate, endDate) => {
        const params = { entrepriseId };
        if (startDate)
            params.startDate = startDate;
        if (endDate)
            params.endDate = endDate;
        return PointageModel.findAll(params);
    },
    // Récupérer les pointages du jour
    findTodayByEmploye: async (employeId) => {
        const today = new Date();
        return PointageModel.findAll({
            employeId,
            date: today
        });
    },
    // Vérifier si un employé peut pointer (anti-fraude)
    canCheckIn: async (employeId, location) => {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        try {
            // Récupérer l'employé pour obtenir l'ID de l'entreprise
            const employe = await prisma.employe.findUnique({
                where: { id: employeId },
                select: { entrepriseId: true }
            });
            if (!employe) {
                return { canCheckIn: false, reason: 'Employé non trouvé' };
            }
            // Récupérer l'entreprise pour les coordonnées GPS
            const entreprise = await prisma.entreprise.findUnique({
                where: { id: employe.entrepriseId },
                select: { latitude: true, longitude: true, nom: true }
            });
            // Vérifier les pointages récents (dernières 24h)
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const recentPointages = await PointageModel.findAll({
                employeId,
                startDate: yesterday
            });
            // Règle 1: Limiter à un pointage par tranche de 8 heures
            const lastPointage = recentPointages[0]; // Plus récent en premier
            if (lastPointage) {
                const timeSinceLast = Date.now() - lastPointage.timestamp.getTime();
                const hoursSinceLast = timeSinceLast / (1000 * 60 * 60);
                // Empêcher les pointages trop fréquents (moins de 8 heures)
                if (hoursSinceLast < 8) {
                    const remainingHours = Math.ceil((8 - hoursSinceLast) * 10) / 10; // Arrondi à 1 décimale
                    return {
                        canCheckIn: false,
                        reason: `Pointage trop fréquent. Prochain pointage possible dans ${remainingHours}h`
                    };
                }
            }
            // Règle 2: Vérification de proximité GPS si coordonnées disponibles
            if (location && entreprise?.latitude && entreprise?.longitude) {
                const distance = calculateDistance(location.lat, location.lng, entreprise.latitude, entreprise.longitude);
                // Rayon de 500 mètres autour de l'entreprise
                const maxDistance = 0.5; // km
                if (distance > maxDistance) {
                    return {
                        canCheckIn: false,
                        reason: `Vous devez être à proximité de ${entreprise.nom} pour pointer (distance: ${distance.toFixed(2)}km)`
                    };
                }
            }
            return { canCheckIn: true };
        }
        catch (error) {
            console.error('Erreur dans canCheckIn:', error);
            return { canCheckIn: false, reason: 'Erreur de vérification' };
        }
        finally {
            await prisma.$disconnect();
        }
    },
    // Générer un QR code pour le pointage
    generateQRCode: async (employeId, entrepriseId) => {
        const timestamp = Date.now();
        const qrData = {
            employeId,
            entrepriseId,
            timestamp,
            type: 'checkin'
        };
        // Encoder en base64 pour le QR
        const qrString = btoa(JSON.stringify(qrData));
        return {
            qrCode: qrString,
            expiresAt: timestamp + (15 * 60 * 1000) // 15 minutes
        };
    },
    // Générer un QR code pour l'entreprise (pointage dynamique)
    generateCompanyQRCode: async (entrepriseId) => {
        const timestamp = Date.now();
        const qrData = {
            entrepriseId,
            timestamp,
            type: 'company_checkin'
        };
        // Encoder en base64 pour le QR
        const qrString = btoa(JSON.stringify(qrData));
        // Créer une URL pour le QR code
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const qrUrl = `${frontendUrl}/checkin?data=${encodeURIComponent(qrString)}`;
        return {
            qrCode: qrUrl,
            qrData: qrString, // Garder les données brutes pour compatibilité
            expiresAt: timestamp + (60 * 60 * 1000), // 1 heure pour le QR entreprise
            entrepriseId
        };
    },
    // Valider un QR code
    validateQRCode: async (qrString, location) => {
        try {
            const qrData = JSON.parse(atob(qrString));
            // Vérifier l'expiration
            if (Date.now() > qrData.timestamp + (15 * 60 * 1000)) {
                throw new Error('QR code expiré');
            }
            // Créer le pointage
            const pointageData = {
                employeId: qrData.employeId,
                type: 'entree',
                method: 'qr',
                verified: true
            };
            if (location) {
                pointageData.location = location;
            }
            const pointage = await PointageService.create(pointageData);
            return { success: true, pointage };
        }
        catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' };
        }
    },
    // Statistiques des pointages
    getStats: async (employeId, startDate, endDate) => {
        const params = {};
        if (employeId)
            params.employeId = employeId;
        if (startDate)
            params.startDate = startDate;
        if (endDate)
            params.endDate = endDate;
        const pointages = await PointageModel.findAll(params);
        const stats = {
            totalPointages: pointages.length,
            byMethod: {},
            byType: {},
            averagePerDay: 0
        };
        pointages.forEach(pointage => {
            stats.byMethod[pointage.method] = (stats.byMethod[pointage.method] || 0) + 1;
            stats.byType[pointage.type] = (stats.byType[pointage.type] || 0) + 1;
        });
        return stats;
    }
};
const PresenceService = {
    // Récupérer la présence d'un employé
    findByEmploye: async (employeId, startDate, endDate) => {
        const params = { employeId };
        if (startDate)
            params.startDate = startDate;
        if (endDate)
            params.endDate = endDate;
        return PresenceModel.findAll(params);
    },
    // Calculer les heures travaillées pour un mois
    calculateMonthlyHours: async (employeId, year, month) => {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // Dernier jour du mois
        const presences = await PresenceModel.findAll({
            employeId,
            startDate,
            endDate
        });
        const totalHours = presences.reduce((sum, presence) => sum + (presence.heuresTravaillees || 0), 0);
        return {
            totalHours,
            workedDays: presences.filter(p => p.statut === 'present').length,
            absences: presences.filter(p => p.statut === 'absent').length,
            presences: presences.length
        };
    },
    // Marquer une absence
    markAbsence: async (employeId, date, reason) => {
        return PresenceModel.upsert(employeId, date, {
            statut: 'absent',
            heuresTravaillees: 0
        });
    },
    // Marquer un congé
    markLeave: async (employeId, date, type) => {
        return PresenceModel.upsert(employeId, date, {
            statut: type,
            heuresTravaillees: 0
        });
    }
};
export { PointageService, PresenceService };
export default PointageService;
//# sourceMappingURL=pointage.service.js.map