import prisma from "../../config/db.js";
const PointageModel = {
    create: async (data) => {
        return prisma.pointage.create({ data });
    },
    findById: async (id) => {
        return prisma.pointage.findUnique({
            where: { id },
            include: { employe: true }
        });
    },
    findAll: async (params) => {
        const where = {};
        if (params?.employeId) {
            where.employeId = params.employeId;
        }
        if (params?.entrepriseId) {
            where.employe = {
                entrepriseId: params.entrepriseId
            };
        }
        if (params?.date) {
            const startOfDay = new Date(params.date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(params.date);
            endOfDay.setHours(23, 59, 59, 999);
            where.timestamp = {
                gte: startOfDay,
                lte: endOfDay
            };
        }
        if (params?.startDate && params?.endDate) {
            where.timestamp = {
                gte: params.startDate,
                lte: params.endDate
            };
        }
        if (params?.method) {
            where.method = params.method;
        }
        if (params?.verified !== undefined) {
            where.verified = params.verified;
        }
        console.log('PointageModel.findAll - where clause:', JSON.stringify(where, null, 2));
        const result = await prisma.pointage.findMany({
            where,
            include: { employe: true },
            orderBy: { timestamp: 'desc' }
        });
        console.log('PointageModel.findAll - found', result.length, 'pointages');
        return result;
    },
    update: async (id, data) => {
        return prisma.pointage.update({
            where: { id },
            data
        });
    },
    delete: async (id) => {
        return prisma.pointage.delete({ where: { id } });
    }
};
const PresenceModel = {
    create: async (data) => {
        return prisma.presence.create({ data });
    },
    findById: async (id) => {
        return prisma.presence.findUnique({
            where: { id },
            include: {
                employe: true,
                pointages: {
                    orderBy: { timestamp: 'asc' }
                }
            }
        });
    },
    findByEmployeAndDate: async (employeId, date) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return prisma.presence.findUnique({
            where: {
                employeId_date: {
                    employeId,
                    date: startOfDay
                }
            },
            include: {
                employe: true,
                pointages: {
                    orderBy: { timestamp: 'asc' }
                }
            }
        });
    },
    findAll: async (params) => {
        const where = {};
        if (params?.employeId) {
            where.employeId = params.employeId;
        }
        if (params?.startDate && params?.endDate) {
            where.date = {
                gte: params.startDate,
                lte: params.endDate
            };
        }
        if (params?.statut) {
            where.statut = params.statut;
        }
        return prisma.presence.findMany({
            where,
            include: {
                employe: true,
                pointages: {
                    orderBy: { timestamp: 'asc' }
                }
            },
            orderBy: { date: 'desc' }
        });
    },
    update: async (id, data) => {
        return prisma.presence.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date()
            }
        });
    },
    upsert: async (employeId, date, data) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        return prisma.presence.upsert({
            where: {
                employeId_date: {
                    employeId,
                    date: startOfDay
                }
            },
            update: {
                ...data,
                updatedAt: new Date()
            },
            create: {
                employeId,
                date: startOfDay,
                ...data
            },
            include: {
                employe: true,
                pointages: {
                    orderBy: { timestamp: 'asc' }
                }
            }
        });
    },
    delete: async (id) => {
        return prisma.presence.delete({ where: { id } });
    },
    // Calcul automatique des heures travaillées
    calculateWorkedHours: async (employeId, date) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const pointages = await prisma.pointage.findMany({
            where: {
                employeId,
                timestamp: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            orderBy: { timestamp: 'asc' }
        });
        let totalHours = 0;
        let currentSessionStart = null;
        for (const pointage of pointages) {
            if (pointage.type === 'entree') {
                currentSessionStart = pointage.timestamp;
            }
            else if (pointage.type === 'sortie' && currentSessionStart) {
                const sessionHours = (pointage.timestamp.getTime() - currentSessionStart.getTime()) / (1000 * 60 * 60);
                totalHours += sessionHours;
                currentSessionStart = null;
            }
        }
        return totalHours;
    }
};
export { PointageModel, PresenceModel };
export default PointageModel;
//# sourceMappingURL=pointage.model.js.map