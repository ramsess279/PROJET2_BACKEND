import PaiementModel from "./paiement.model.js";
const PaiementService = {
    create: async (data) => PaiementModel.create(data),
    findById: async (id) => PaiementModel.findById(id),
    findAll: async () => PaiementModel.findAll(),
    update: async (id, data) => PaiementModel.update(id, data),
    delete: async (id) => PaiementModel.delete(id),
};
export default PaiementService;
//# sourceMappingURL=paiement.service.js.map