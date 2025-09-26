import EntrepriseModel from './entreprise.model.js';
import type { Entreprise } from './entreprise.entity.js';

const EntrepriseService = {
  create: async (data: Entreprise) => EntrepriseModel.create(data),
  findById: async (id: string) => EntrepriseModel.findById(id),
  findAll: async () => EntrepriseModel.findAll(),
  update: async (id: string, data: Partial<Entreprise>) => EntrepriseModel.update(id, data),
  delete: async (id: string) => EntrepriseModel.delete(id),
};

export default EntrepriseService;