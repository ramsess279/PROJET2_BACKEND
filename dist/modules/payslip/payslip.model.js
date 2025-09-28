import prisma from "../../config/db.js";
const PayslipModel = {
    create: (data) => prisma.payslip.create({ data }),
    findById: (id) => prisma.payslip.findUnique({ where: { id } }),
    findAll: () => prisma.payslip.findMany(),
    update: (id, data) => prisma.payslip.update({ where: { id }, data }),
    delete: (id) => prisma.payslip.delete({ where: { id } }),
};
export default PayslipModel;
//# sourceMappingURL=payslip.model.js.map