import { Router } from "express";
import PayslipController from "./payslip.controller.js";
const router = Router();
router.get("/", PayslipController.findAll);
router.get("/:id", PayslipController.findById);
router.post("/", PayslipController.create);
router.patch("/:id", PayslipController.update);
router.delete("/:id", PayslipController.delete);
export default router;
//# sourceMappingURL=payslip.routes.js.map