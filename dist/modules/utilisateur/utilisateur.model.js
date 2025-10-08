import prisma from "../../config/db.js";
const UserModel = {
    create: (data) => {
        return prisma.utilisateur.create({ data });
    },
    findById: (id) => {
        return prisma.utilisateur.findUnique({ where: { id } });
    },
    findAll: (params) => {
        const { page = 1, limit = 10, search, status, role, entrepriseId, includeEmployeeUsers } = params || {};
        const where = {};
        if (search) {
            where.OR = [
                { nomComplet: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status && status !== 'all') {
            where.statut = status;
        }
        if (role && role !== 'all') {
            where.role = role;
        }
        if (entrepriseId) {
            where.entrepriseId = entrepriseId;
        }
        // Inclure les utilisateurs créés via les employés (caissiers, vigiles)
        if (includeEmployeeUsers) {
            where.OR = where.OR || [];
            where.OR.push({ employeId: { not: null } });
        }
        return prisma.utilisateur.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { id: 'desc' },
            include: { employe: true }
        });
    },
    count: (params) => {
        const { search, status, role, entrepriseId, includeEmployeeUsers } = params || {};
        const where = {};
        if (search) {
            where.OR = [
                { nomComplet: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status && status !== 'all') {
            where.statut = status;
        }
        if (role && role !== 'all') {
            where.role = role;
        }
        if (entrepriseId) {
            where.entrepriseId = entrepriseId;
        }
        // Inclure les utilisateurs créés via les employés (caissiers, vigiles)
        if (includeEmployeeUsers) {
            where.OR = where.OR || [];
            where.OR.push({ employeId: { not: null } });
        }
        return prisma.utilisateur.count({ where });
    },
    findByEntrepriseId: (entrepriseId) => {
        return prisma.utilisateur.findMany({
            where: { entrepriseId }
        });
    },
    findAdminByEntrepriseId: (entrepriseId) => {
        return prisma.utilisateur.findFirst({
            where: {
                entrepriseId,
                role: 'admin'
            }
        });
    },
    update: (id, data) => {
        return prisma.utilisateur.update({
            where: { id },
            data
        });
    },
    delete: (id) => {
        prisma.utilisateur.delete({ where: { id } });
    }
};
export default UserModel;
//# sourceMappingURL=utilisateur.model.js.map