import prisma from '../../config/db.js';
const EntrepriseModel = {
    create: (data) => prisma.entreprise.create({ data }),
    findById: (id) => prisma.entreprise.findUnique({ where: { id } }),
    findAll: () => prisma.entreprise.findMany(),
    update: (id, data) => prisma.entreprise.update({ where: { id }, data }),
    delete: (id) => prisma.entreprise.delete({ where: { id } }),
};
export default EntrepriseModel;
//# sourceMappingURL=entreprise.model.js.map