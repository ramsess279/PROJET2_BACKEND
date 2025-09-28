import PayslipModel from "./payslip.model.js";
const PayslipService = {
    create: async (data) => PayslipModel.create(data),
    findById: async (id) => PayslipModel.findById(id),
    findAll: async () => PayslipModel.findAll(),
    update: async (id, data) => PayslipModel.update(id, data),
    delete: async (id) => PayslipModel.delete(id),
};
export default PayslipService;
//# sourceMappingURL=payslip.service.js.map