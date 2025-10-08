import prisma from "../../config/db.js";
const PaiementModel = {
    create: (data) => prisma.paiement.create({ data }),
    findById: (id) => prisma.paiement.findUnique({ where: { id } }),
    findByIdWithRelations: (id) => prisma.paiement.findUnique({
        where: { id },
        include: {
            payslip: {
                include: {
                    employe: {
                        include: {
                            entreprise: true
                        }
                    },
                    payRun: true
                }
            }
        }
    }),
    findAll: (params) => {
        const where = {};
        if (params?.entrepriseId) {
            where.payslip = {
                employe: {
                    entrepriseId: params.entrepriseId
                }
            };
        }
        return prisma.paiement.findMany({
            where,
            include: {
                payslip: {
                    include: {
                        employe: true
                    }
                }
            }
        });
    },
    update: (id, data) => prisma.paiement.update({ where: { id }, data }),
    delete: (id) => prisma.paiement.delete({ where: { id } }),
};
export default PaiementModel;
//# sourceMappingURL=paiement.model.js.map