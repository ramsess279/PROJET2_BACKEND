import { Router } from "express";
import EmployeController from "./employe.controller.js";
const router = Router();
router.get("/", EmployeController.findAll);
router.get("/:id", EmployeController.findById);
router.post("/", EmployeController.create);
router.patch("/:id", EmployeController.update);
router.delete("/:id", EmployeController.delete);
export default router;
//# sourceMappingURL=employe.routes.js.map