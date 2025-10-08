import { Router } from "express";
import PayslipController from "./payslip.controller.js";
import AuthMiddleware from "../auth/auth.middelware.js";

const router = Router();

router.get("/", AuthMiddleware.TokenVerifed, PayslipController.findAll);
router.get("/:id", AuthMiddleware.TokenVerifed, PayslipController.findById);
router.get("/payrun/:payrunId", AuthMiddleware.TokenVerifed, PayslipController.findByPayrun);
router.get("/:id/download", AuthMiddleware.TokenVerifed, PayslipController.download);
router.post("/", PayslipController.create);
router.patch("/:id", PayslipController.update);
router.delete("/:id", PayslipController.delete);

export default router;