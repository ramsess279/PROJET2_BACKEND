import prisma from "../../config/db.js";
const PaiementModel = {
    create: (data) => prisma.paiement.create({ data }),
    findById: (id) => prisma.paiement.findUnique({ where: { id } }),
    findAll: () => prisma.paiement.findMany(),
    update: (id, data) => prisma.paiement.update({ where: { id }, data }),
    delete: (id) => prisma.paiement.delete({ where: { id } }),
};
export default PaiementModel;
//# sourceMappingURL=paiement.model.js.map