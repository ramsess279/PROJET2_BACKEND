import prisma from "../../config/db.js";
import type { Employe } from "./employe.entity.js";

const EmployeModel = {
  create: (data: Employe) => {
    return prisma.employe.create({ data });
  },

  findById: (id: string) => {
    return prisma.employe.findUnique({ where: { id } });
  },

  findAll: () => {
    return prisma.employe.findMany();
  },

  update: (id: string, data: Partial<Employe>) => {
    return prisma.employe.update({
      where: { id },
      data,
    });
  },

  delete: (id: string) => {
    return prisma.employe.delete({ where: { id } });
  }
};

export default EmployeModel;