import prisma from "../../config/db.js";
import type { Employe } from "./employe.entity.js";

const EmployeModel = {
  create: (data: Employe) => {
    // Nettoyer les données : ne pas envoyer les champs vides
    const cleanData = { ...data };
    if (!cleanData.postePersonnalise || cleanData.postePersonnalise.trim() === '') {
      delete cleanData.postePersonnalise;
    }
    return prisma.employe.create({ data: cleanData });
  },

  findById: (id: string) => {
    return prisma.employe.findUnique({ where: { id } });
  },

  findAll: (params?: { page?: number; limit?: number; search?: string; status?: string; typeContrat?: string; entrepriseId?: string }) => {
    const { page = 1, limit = 10, search, status, typeContrat, entrepriseId } = params || {};

    const where: any = {};

    if (search) {
      where.OR = [
        { nomComplet: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { poste: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status && status !== 'all') {
      where.statut = status;
    }

    if (typeContrat && typeContrat !== 'all') {
      where.typeContrat = typeContrat;
    }

    if (entrepriseId) {
      where.entrepriseId = entrepriseId;
    }

    return prisma.employe.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { id: 'desc' },
    });
  },

  update: (id: string, data: Partial<Employe>) => {
    return prisma.employe.update({
      where: { id },
      data,
    });
  },

  delete: (id: string) => {
    return prisma.employe.delete({ where: { id } });
  },

  count: (params?: { search?: string; status?: string; typeContrat?: string; entrepriseId?: string }) => {
    const { search, status, typeContrat, entrepriseId } = params || {};

    const where: any = {};

    if (search) {
      where.OR = [
        { nomComplet: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { poste: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status && status !== 'all') {
      where.statut = status;
    }

    if (typeContrat && typeContrat !== 'all') {
      where.typeContrat = typeContrat;
    }

    if (entrepriseId) {
      where.entrepriseId = entrepriseId;
    }

    return prisma.employe.count({ where });
  }
};

export default EmployeModel;