import { Router } from "express";
import PaiementController from "./paiement.controller.js";
const router = Router();
router.get("/", PaiementController.findAll);
router.get("/:id", PaiementController.findById);
router.post("/", PaiementController.create);
router.patch("/:id", PaiementController.update);
router.delete("/:id", PaiementController.delete);
export default router;
//# sourceMappingURL=paie.routes.js.map