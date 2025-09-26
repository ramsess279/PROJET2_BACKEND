import EntrepriseModel from './entreprise.model.js';
const EntrepriseService = {
    create: async (data) => EntrepriseModel.create(data),
    findById: async (id) => EntrepriseModel.findById(id),
    findAll: async () => EntrepriseModel.findAll(),
    update: async (id, data) => EntrepriseModel.update(id, data),
    delete: async (id) => EntrepriseModel.delete(id),
};
export default EntrepriseService;
//# sourceMappingURL=entreprise.service.js.map