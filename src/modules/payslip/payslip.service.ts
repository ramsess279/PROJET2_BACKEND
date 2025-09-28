import type { Payslip } from "./payslip.entity.js";
import PayslipModel from "./payslip.model.js";

const PayslipService = {
  create: async (data: Payslip) => PayslipModel.create(data),
  findById: async (id: string) => PayslipModel.findById(id),
  findAll: async () => PayslipModel.findAll(),
  update: async (id: string, data: Partial<Payslip>) => PayslipModel.update(id, data),
  delete: async (id: string) => PayslipModel.delete(id),
};

export default PayslipService;