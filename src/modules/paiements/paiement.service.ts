import type { Paiement } from "./paiement.entity.js";
import PaiementModel from "./paiement.model.js";

const PaiementService = {
  create: async (data: Paiement) => PaiementModel.create(data),
  findById: async (id: string) => PaiementModel.findById(id),
  findAll: async () => PaiementModel.findAll(),
  update: async (id: string, data: Partial<Paiement>) => PaiementModel.update(id, data),
  delete: async (id: string) => PaiementModel.delete(id),
};

export default PaiementService;