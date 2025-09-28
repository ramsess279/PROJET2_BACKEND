import type { PayRun } from "./payrun.entity.js";
import PayRunModel from "./payrun.model.js";

const PayRunService = {
  create: async (data: PayRun) => PayRunModel.create(data),
  findById: async (id: string) => PayRunModel.findById(id),
  findAll: async () => PayRunModel.findAll(),
  update: async (id: string, data: Partial<PayRun>) => PayRunModel.update(id, data),
  delete: async (id: string) => PayRunModel.delete(id),
};

export default PayRunService;