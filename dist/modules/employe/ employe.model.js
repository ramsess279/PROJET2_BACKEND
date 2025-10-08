import prisma from "../../config/db.js";
const EmployeModel = {
    create: (data) => {
        // Nettoyer les données : ne pas envoyer les champs vides
        const cleanData = { ...data };
        if (!cleanData.postePersonnalise || cleanData.postePersonnalise.trim() === '') {
            delete cleanData.postePersonnalise;
        }
        return prisma.employe.create({ data: cleanData });
    },
    findById: (id) => {
        return prisma.employe.findUnique({ where: { id } });
    },
    findAll: (params) => {
        const { page = 1, limit = 10, search, status, typeContrat, entrepriseId } = params || {};
        const where = {};
        if (search) {
            where.OR = [
                { nomComplet: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { poste: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status && status !== 'all') {
            where.statut = status;
        }
        if (typeContrat && typeContrat !== 'all') {
            where.typeContrat = typeContrat;
        }
        if (entrepriseId) {
            where.entrepriseId = entrepriseId;
        }
        return prisma.employe.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { id: 'desc' },
        });
    },
    update: (id, data) => {
        return prisma.employe.update({
            where: { id },
            data,
        });
    },
    delete: (id) => {
        return prisma.employe.delete({ where: { id } });
    },
    count: (params) => {
        const { search, status, typeContrat, entrepriseId } = params || {};
        const where = {};
        if (search) {
            where.OR = [
                { nomComplet: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { poste: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status && status !== 'all') {
            where.statut = status;
        }
        if (typeContrat && typeContrat !== 'all') {
            where.typeContrat = typeContrat;
        }
        if (entrepriseId) {
            where.entrepriseId = entrepriseId;
        }
        return prisma.employe.count({ where });
    }
};
export default EmployeModel;
//# sourceMappingURL=%20employe.model.js.map