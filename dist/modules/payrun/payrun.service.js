import PayRunModel from "./payrun.model.js";
const PayRunService = {
    create: async (data) => PayRunModel.create(data),
    findById: async (id) => PayRunModel.findById(id),
    findAll: async () => PayRunModel.findAll(),
    update: async (id, data) => PayRunModel.update(id, data),
    delete: async (id) => PayRunModel.delete(id),
};
export default PayRunService;
//# sourceMappingURL=payrun.service.js.map