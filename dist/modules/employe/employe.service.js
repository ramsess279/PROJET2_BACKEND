import EmployeModel from "./ employe.model.js";
const EmployeService = {
    create: async (data) => {
        return EmployeModel.create(data);
    },
    findById: async (id) => {
        return EmployeModel.findById(id);
    },
    findAll: async () => {
        return EmployeModel.findAll();
    },
    update: async (id, data) => {
        return EmployeModel.update(id, data);
    },
    delete: async (id) => {
        return EmployeModel.delete(id);
    }
};
export default EmployeService;
//# sourceMappingURL=employe.service.js.map