import { Router } from "express";
import PayRunController from "./payrun.controller.js";
import AuthMiddleware from "../auth/auth.middelware.js";
import { canModifyCompany } from "../auth/role.middleware.js";

const router = Router();

router.get("/", AuthMiddleware.TokenVerifed, PayRunController.findAll);
router.get("/:id", AuthMiddleware.TokenVerifed, PayRunController.findById);
router.post("/", AuthMiddleware.TokenVerifed, canModifyCompany(), PayRunController.create);
router.patch("/:id", AuthMiddleware.TokenVerifed, canModifyCompany(), PayRunController.update);
router.patch("/:id/approve", AuthMiddleware.TokenVerifed, canModifyCompany(), PayRunController.approve);
router.post("/:id/generate-payslips", AuthMiddleware.TokenVerifed, canModifyCompany(), PayRunController.generatePayslips);
router.delete("/:id", AuthMiddleware.TokenVerifed, canModifyCompany(), PayRunController.delete);

export default router;