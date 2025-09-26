import type { Employe } from "./employe.entity.js";
import EmployeModel from "./ employe.model.js";

const EmployeService = {
  create: async (data: Employe) => {
    return EmployeModel.create(data);
  },

  findById: async (id: string) => {
    return EmployeModel.findById(id);
  },

  findAll: async () => {
    return EmployeModel.findAll();
  },

  update: async (id: string, data: Partial<Employe>) => {
    return EmployeModel.update(id, data);
  },

  delete: async (id: string) => {
    return EmployeModel.delete(id);
  }
};

export default EmployeService;