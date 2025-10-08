import { Router } from "express";
import PaiementController from "./paiement.controller.js";

const router = Router();

router.get("/", PaiementController.findAll);
router.get("/:id", PaiementController.findById);
router.get("/:id/download", PaiementController.downloadReceipt);
router.post("/", PaiementController.create);
router.patch("/:id", PaiementController.update);
router.delete("/:id", PaiementController.delete);

export default router;
