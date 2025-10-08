import prisma from "../../config/db.js";
import type { Payslip } from "./payslip.entity.js";

const PayslipModel = {
  create: (data: Payslip) => prisma.payslip.create({ data }),
  findById: (id: string) => prisma.payslip.findUnique({
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
  findByIdWithRelations: (id: string) => prisma.payslip.findUnique({
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
  findAll: (params?: {
    employeId?: string;
    payrunId?: string;
    statut?: string;
    page?: number;
    limit?: number;
    entrepriseId?: string;
  }) => {
    const where: any = {};
    if (params?.employeId) where.employeId = params.employeId;
    if (params?.payrunId) where.payRunId = params.payrunId;
    if (params?.statut) where.statut = params.statut;
    if (params?.entrepriseId) {
      where.employe = {
        entrepriseId: params.entrepriseId
      };
    }

    const options: any = {
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
  findByEmploye: (employeId: string) => prisma.payslip.findMany({
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
  findByPayrun: (payrunId: string) => prisma.payslip.findMany({
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
  update: (id: string, data: Partial<Payslip>) => prisma.payslip.update({ where: { id }, data }),
  delete: (id: string) => prisma.payslip.delete({ where: { id } }),
};

export default PayslipModel;