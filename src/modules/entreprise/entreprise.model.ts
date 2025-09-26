import prisma from '../../config/db.js';
import type { Entreprise } from './entreprise.entity.js';

const EntrepriseModel = {
  create: (data: Entreprise) => prisma.entreprise.create({ data }),
  findById: (id: string) => prisma.entreprise.findUnique({ where: { id } }),
  findAll: () => prisma.entreprise.findMany(),
  update: (id: string, data: Partial<Entreprise>) =>
    prisma.entreprise.update({ where: { id }, data }),
  delete: (id: string) => prisma.entreprise.delete({ where: { id } }),
};

export default EntrepriseModel;