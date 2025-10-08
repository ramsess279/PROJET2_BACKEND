import prisma from "../../config/db.js";
const PayslipModel = {
    create: (data) => prisma.payslip.create({ data }),
    findById: (id) => prisma.payslip.findUnique({
        where: { id },
        include: {
            employe: {
                include: {
                    entreprise: true
                }
            },
            payRun: true,
            paiements: true
        }
    }),
    findByIdWithRelations: (id) => prisma.payslip.findUnique({
        where: { id },
        include: {
            employe: {
                include: {
                    entreprise: true
                }
            },
            payRun: true,
            paiements: true
        }
    }),
    findAll: (params) => {
        const where = {};
        if (params?.employeId)
            where.employeId = params.employeId;
        if (params?.payrunId)
            where.payRunId = params.payrunId;
        if (params?.statut)
            where.statut = params.statut;
        if (params?.entrepriseId) {
            where.employe = {
                entrepriseId: params.entrepriseId
            };
        }
        const options = {
            where,
            include: {
                employe: {
                    include: {
                        entreprise: true
                    }
                },
                payRun: true,
                paiements: true
            },
            orderBy: {
                dateGen: 'desc'
            }
        };
        if (params?.page && params?.limit) {
            options.skip = (params.page - 1) * params.limit;
            options.take = params.limit;
        }
        return prisma.payslip.findMany(options);
    },
    findByEmploye: (employeId) => prisma.payslip.findMany({
        where: { employeId },
        include: {
            employe: {
                include: {
                    entreprise: true
                }
            },
            payRun: true,
            paiements: true
        },
        orderBy: {
            dateGen: 'desc'
        }
    }),
    findByPayrun: (payrunId) => prisma.payslip.findMany({
        where: { payRunId: payrunId },
        include: {
            employe: {
                include: {
                    entreprise: true
                }
            },
            payRun: true,
            paiements: true
        },
        orderBy: {
            employe: {
                nomComplet: 'asc'
            }
        }
    }),
    update: (id, data) => prisma.payslip.update({ where: { id }, data }),
    delete: (id) => prisma.payslip.delete({ where: { id } }),
};
export default PayslipModel;
//# sourceMappingURL=payslip.model.js.map