import prisma from "../../config/db.js";
import type { PayRun } from "./payrun.entity.js";

const PayRunModel = {
  create: (data: PayRun) => prisma.payRun.create({ data }),
  findById: (id: string) => prisma.payRun.findUnique({ where: { id } }),
  findAll: (params?: { entrepriseId?: string }) => {
    const where: any = {};
    if (params?.entrepriseId) {
      where.entrepriseId = params.entrepriseId;
    }
    return prisma.payRun.findMany({ where });
  },
  update: (id: string, data: Partial<PayRun>) => prisma.payRun.update({ where: { id }, data }),
  delete: (id: string) => prisma.payRun.delete({ where: { id } }),
};

export default PayRunModel;