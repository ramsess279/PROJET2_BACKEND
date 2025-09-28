import prisma from "../../config/db.js";
import type { Paiement } from "./paiement.entity.js";

const PaiementModel = {
  create: (data: Paiement) => prisma.paiement.create({ data }),
  findById: (id: string) => prisma.paiement.findUnique({ where: { id } }),
  findAll: () => prisma.paiement.findMany(),
  update: (id: string, data: Partial<Paiement>) => prisma.paiement.update({ where: { id }, data }),
  delete: (id: string) => prisma.paiement.delete({ where: { id } }),
};

export default PaiementModel;