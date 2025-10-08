import { Router } from "express";
import EmployeController from "./employe.controller.js";
import PointageRouter from "./pointage.routes.js";
import AuthMiddleware from "../auth/auth.middelware.js";
import { canModifyCompany } from "../auth/role.middleware.js";
const router = Router();
// Route publique pour le pointage (sans authentification)
router.get("/public", EmployeController.findAllPublic);
router.get("/", AuthMiddleware.TokenVerifed, EmployeController.findAll);
router.get("/:id", AuthMiddleware.TokenVerifed, EmployeController.findById);
router.post("/", AuthMiddleware.TokenVerifed, canModifyCompany(), EmployeController.create);
router.patch("/:id", AuthMiddleware.TokenVerifed, canModifyCompany(), EmployeController.update);
router.delete("/:id", AuthMiddleware.TokenVerifed, canModifyCompany(), EmployeController.delete);
// Routes des pointages
router.use("/pointages", PointageRouter);
export default router;
//# sourceMappingURL=employe.routes.js.map