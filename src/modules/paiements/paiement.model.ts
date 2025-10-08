import prisma from "../../config/db.js";
import type { Paiement } from "./paiement.entity.js";

const PaiementModel = {
  create: (data: Paiement) => prisma.paiement.create({ data }),
  findById: (id: string) => prisma.paiement.findUnique({ where: { id } }),
  findByIdWithRelations: (id: string) => prisma.paiement.findUnique({
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
  findAll: (params?: { entrepriseId?: string }) => {
    const where: any = {};
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
  update: (id: string, data: Partial<Paiement>) => prisma.paiement.update({ where: { id }, data }),
  delete: (id: string) => prisma.paiement.delete({ where: { id } }),
};

export default PaiementModel;