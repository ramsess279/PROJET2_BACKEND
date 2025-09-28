import prisma from "../../config/db.js";
const PayRunModel = {
    create: (data) => prisma.payRun.create({ data }),
    findById: (id) => prisma.payRun.findUnique({ where: { id } }),
    findAll: () => prisma.payRun.findMany(),
    update: (id, data) => prisma.payRun.update({ where: { id }, data }),
    delete: (id) => prisma.payRun.delete({ where: { id } }),
};
export default PayRunModel;
//# sourceMappingURL=payrun.model.js.map