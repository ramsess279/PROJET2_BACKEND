import prisma from "../../config/db.js";
import type { Payslip } from "./payslip.entity.js";

const PayslipModel = {
  create: (data: Payslip) => prisma.payslip.create({ data }),
  findById: (id: string) => prisma.payslip.findUnique({ where: { id } }),
  findAll: () => prisma.payslip.findMany(),
  update: (id: string, data: Partial<Payslip>) => prisma.payslip.update({ where: { id }, data }),
  delete: (id: string) => prisma.payslip.delete({ where: { id } }),
};

export default PayslipModel;