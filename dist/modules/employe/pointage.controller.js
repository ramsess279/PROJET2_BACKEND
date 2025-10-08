import { PointageService, PresenceService } from "./pointage.service.js";
const PointageController = {
    // Enregistrer un pointage
    create: async (req, res) => {
        try {
            const data = req.body;
            // Ajouter l'employeId depuis le token si c'est un employé qui pointe
            if (req.user?.role === 'employe' && req.user.id) {
                data.employeId = req.user.id;
            }
            // Validation de base
            if (!data.employeId) {
                return res.status(400).json({ error: "ID employé requis" });
            }
            const pointage = await PointageService.create(data);
            res.status(201).json({ success: true, data: pointage });
        }
        catch (error) {
            console.error('Erreur création pointage:', error);
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            res.status(500).json({ error: "Impossible de créer le pointage: " + errorMessage });
        }
    },
    // Récupérer les pointages
    findAll: async (req, res) => {
        try {
            const { employeId, startDate, endDate, method, verified } = req.query;
            const params = {};
            if (employeId)
                params.employeId = employeId;
            if (startDate)
                params.startDate = new Date(startDate);
            if (endDate)
                params.endDate = new Date(endDate);
            if (method)
                params.method = method;
            if (verified)
                params.verified = verified === 'true';
            // Filtrer par entreprise si admin/super-admin
            if (req.user?.entrepriseId && req.user?.role !== 'super-admin') {
                // Pour les admins, filtrer par leur entreprise
                // TODO: Implémenter la logique de filtrage par entreprise
            }
            const pointages = await PointageService.findAll(params);
            res.status(200).json({ data: pointages });
        }
        catch (error) {
            console.error('Erreur récupération pointages:', error);
            res.status(500).json({ error: "Impossible de récupérer les pointages" });
        }
    },
    // Récupérer les pointages d'un employé
    findByEmploye: async (req, res) => {
        try {
            const { employeId } = req.params;
            const { startDate, endDate } = req.query;
            if (!employeId) {
                return res.status(400).json({ error: "ID employé requis" });
            }
            const start = startDate ? new Date(startDate) : undefined;
            const end = endDate ? new Date(endDate) : undefined;
            const pointages = await PointageService.findByEmploye(employeId, start, end);
            res.status(200).json({ data: pointages });
        }
        catch (error) {
            console.error('Erreur récupération pointages employé:', error);
            res.status(500).json({ error: "Impossible de récupérer les pointages" });
        }
    },
    // Récupérer les pointages d'une entreprise
    findByEntreprise: async (req, res) => {
        try {
            const { entrepriseId } = req.params;
            const { startDate, endDate } = req.query;
            console.log('findByEntreprise appelé avec:', { entrepriseId, startDate, endDate, user: req.user });
            if (!entrepriseId) {
                return res.status(400).json({ error: "ID entreprise requis" });
            }
            // Vérifier que l'utilisateur a accès à cette entreprise
            if (req.user?.role !== 'super-admin' && req.user?.entrepriseId !== entrepriseId) {
                return res.status(403).json({ error: "Accès non autorisé à cette entreprise" });
            }
            let start;
            let end;
            if (startDate) {
                start = new Date(startDate);
                start.setHours(0, 0, 0, 0); // Début de journée
            }
            if (endDate) {
                end = new Date(endDate);
                end.setHours(23, 59, 59, 999); // Fin de journée
            }
            console.log('Appel PointageService.findByEntreprise avec:', { entrepriseId, start, end });
            const pointages = await PointageService.findByEntreprise(entrepriseId, start, end);
            console.log('Pointages récupérés:', pointages?.length || 0, 'résultats');
            res.status(200).json({ data: pointages });
        }
        catch (error) {
            console.error('Erreur récupération pointages entreprise:', error);
            res.status(500).json({ error: "Impossible de récupérer les pointages" });
        }
    },
    // Générer un QR code
    generateQRCode: async (req, res) => {
        try {
            const { employeId } = req.params;
            if (!employeId) {
                return res.status(400).json({ error: "ID employé requis" });
            }
            // Vérifier que l'utilisateur peut générer un QR pour cet employé
            if (req.user?.role === 'employe' && req.user.id !== employeId) {
                return res.status(403).json({ error: "Accès non autorisé" });
            }
            const qrData = await PointageService.generateQRCode(employeId, req.user?.entrepriseId || '');
            res.status(200).json({ success: true, data: qrData });
        }
        catch (error) {
            console.error('Erreur génération QR code:', error);
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            res.status(500).json({ error: "Impossible de générer le QR code: " + errorMessage });
        }
    },
    // Générer un QR code pour l'entreprise (pointage dynamique)
    generateCompanyQRCode: async (req, res) => {
        try {
            const { entrepriseId } = req.params;
            if (!entrepriseId) {
                return res.status(400).json({ error: "ID entreprise requis" });
            }
            // Vérifier que l'utilisateur a accès à cette entreprise
            if (req.user?.role !== 'super-admin' && req.user?.entrepriseId !== entrepriseId) {
                return res.status(403).json({ error: "Accès non autorisé à cette entreprise" });
            }
            const qrData = await PointageService.generateCompanyQRCode(entrepriseId);
            res.status(200).json({ success: true, data: qrData });
        }
        catch (error) {
            console.error('Erreur génération QR code entreprise:', error);
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            res.status(500).json({ error: "Impossible de générer le QR code entreprise: " + errorMessage });
        }
    },
    // Valider un QR code
    validateQRCode: async (req, res) => {
        try {
            const { qrCode, lat, lng } = req.body;
            if (!qrCode) {
                return res.status(400).json({ error: "QR code requis" });
            }
            const location = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : undefined;
            const result = await PointageService.validateQRCode(qrCode, location);
            if (result.success) {
                res.status(200).json({ success: true, data: result.pointage });
            }
            else {
                res.status(400).json({ error: result.error });
            }
        }
        catch (error) {
            console.error('Erreur validation QR code:', error);
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            res.status(500).json({ error: "Impossible de valider le QR code: " + errorMessage });
        }
    },
    // Vérifier si un employé peut pointer
    canCheckIn: async (req, res) => {
        try {
            const { employeId } = req.params;
            const { lat, lng } = req.query;
            if (!employeId) {
                return res.status(400).json({ error: "ID employé requis" });
            }
            const location = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : undefined;
            const result = await PointageService.canCheckIn(employeId, location);
            res.status(200).json({ data: result });
        }
        catch (error) {
            console.error('Erreur vérification pointage:', error);
            res.status(500).json({ error: "Impossible de vérifier le pointage" });
        }
    },
    // Statistiques des pointages
    getStats: async (req, res) => {
        try {
            const { employeId, startDate, endDate } = req.query;
            let start;
            let end;
            if (startDate) {
                start = new Date(startDate);
                start.setHours(0, 0, 0, 0); // Début de journée
            }
            if (endDate) {
                end = new Date(endDate);
                end.setHours(23, 59, 59, 999); // Fin de journée
            }
            const stats = await PointageService.getStats(employeId, start, end);
            res.status(200).json({ data: stats });
        }
        catch (error) {
            console.error('Erreur récupération statistiques:', error);
            res.status(500).json({ error: "Impossible de récupérer les statistiques" });
        }
    },
    // Générer un rapport de présence pour une entreprise
    generateAttendanceReport: async (req, res) => {
        try {
            const { entrepriseId } = req.params;
            const { startDate, endDate } = req.query;
            if (!entrepriseId) {
                return res.status(400).json({ error: "ID entreprise requis" });
            }
            // Vérifier que l'utilisateur a accès à cette entreprise
            if (req.user?.role !== 'super-admin' && req.user?.role !== 'caissier' && req.user?.entrepriseId !== entrepriseId) {
                return res.status(403).json({ error: "Accès non autorisé à cette entreprise" });
            }
            if (!startDate || !endDate) {
                return res.status(400).json({ error: "Dates de début et fin requises" });
            }
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            // Récupérer tous les pointages de la période
            const attendances = await PointageService.findByEntreprise(entrepriseId, start, end);
            // Récupérer tous les employés actifs de l'entreprise
            const { PrismaClient } = await import('@prisma/client');
            const prisma = new PrismaClient();
            const employees = await prisma.employe.findMany({
                where: {
                    entrepriseId: entrepriseId,
                    statut: 'actif'
                },
                select: {
                    id: true,
                    nomComplet: true
                }
            });
            // Générer le rapport détaillé
            const reportData = {
                period: {
                    start: startDate,
                    end: endDate
                },
                summary: {
                    totalEmployees: employees.length,
                    totalPresent: new Set(attendances.map(a => a.employeId)).size,
                    totalAbsent: 0,
                    totalAttendances: attendances.length
                },
                attendances: attendances,
                employeeDetails: employees.map(employee => {
                    // Calculer les jours travaillés pour cet employé
                    const employeeAttendances = attendances.filter(a => a.employeId === employee.id);
                    const presentDays = new Set(employeeAttendances.map(a => new Date(a.timestamp).toDateString())).size;
                    // Calculer le nombre total de jours dans la période
                    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                    const absentDays = totalDays - presentDays;
                    // Générer le statut quotidien
                    const dailyStatus = [];
                    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                        const dayStr = d.toDateString();
                        const hasAttendance = employeeAttendances.some(a => new Date(a.timestamp).toDateString() === dayStr);
                        dailyStatus.push({
                            date: d.toISOString().split('T')[0],
                            status: hasAttendance ? 'present' : 'absent'
                        });
                    }
                    return {
                        id: employee.id,
                        nomComplet: employee.nomComplet,
                        presentDays,
                        absentDays,
                        totalDays,
                        dailyStatus
                    };
                })
            };
            // Calculer les absents totaux
            reportData.summary.totalAbsent = reportData.employeeDetails.reduce((sum, emp) => sum + emp.absentDays, 0);
            res.status(200).json({ data: reportData });
        }
        catch (error) {
            console.error('Erreur génération rapport présence:', error);
            res.status(500).json({ error: "Impossible de générer le rapport de présence" });
        }
    }
};
const PresenceController = {
    // Récupérer la présence d'un employé
    findByEmploye: async (req, res) => {
        try {
            const { employeId } = req.params;
            const { startDate, endDate } = req.query;
            if (!employeId) {
                return res.status(400).json({ error: "ID employé requis" });
            }
            const start = startDate ? new Date(startDate) : undefined;
            const end = endDate ? new Date(endDate) : undefined;
            const presences = await PresenceService.findByEmploye(employeId, start, end);
            res.status(200).json({ data: presences });
        }
        catch (error) {
            console.error('Erreur récupération présences:', error);
            res.status(500).json({ error: "Impossible de récupérer les présences" });
        }
    },
    // Calculer les heures travaillées pour un mois
    calculateMonthlyHours: async (req, res) => {
        try {
            const { employeId, year, month } = req.params;
            if (!employeId || !year || !month) {
                return res.status(400).json({ error: "Paramètres requis: employeId, year, month" });
            }
            const stats = await PresenceService.calculateMonthlyHours(employeId, parseInt(year), parseInt(month));
            res.status(200).json({ data: stats });
        }
        catch (error) {
            console.error('Erreur calcul heures mensuelles:', error);
            res.status(500).json({ error: "Impossible de calculer les heures" });
        }
    },
    // Marquer une absence
    markAbsence: async (req, res) => {
        try {
            const { employeId } = req.params;
            const { date, reason } = req.body;
            if (!employeId || !date) {
                return res.status(400).json({ error: "ID employé et date requis" });
            }
            const presence = await PresenceService.markAbsence(employeId, new Date(date), reason || '');
            res.status(200).json({ success: true, data: presence });
        }
        catch (error) {
            console.error('Erreur marquage absence:', error);
            res.status(500).json({ error: "Impossible de marquer l'absence" });
        }
    },
    // Marquer un congé
    markLeave: async (req, res) => {
        try {
            const { employeId } = req.params;
            const { date, type } = req.body;
            if (!employeId || !date || !type) {
                return res.status(400).json({ error: "Paramètres requis: employeId, date, type" });
            }
            const presence = await PresenceService.markLeave(employeId, new Date(date), type);
            res.status(200).json({ success: true, data: presence });
        }
        catch (error) {
            console.error('Erreur marquage congé:', error);
            res.status(500).json({ error: "Impossible de marquer le congé" });
        }
    }
};
export { PointageController, PresenceController };
export default PointageController;
//# sourceMappingURL=pointage.controller.js.map