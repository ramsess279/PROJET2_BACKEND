import { Router } from "express";
import PayRunController from "./payrun.controller.js";
const router = Router();
router.get("/", PayRunController.findAll);
router.get("/:id", PayRunController.findById);
router.post("/", PayRunController.create);
router.patch("/:id", PayRunController.update);
router.delete("/:id", PayRunController.delete);
export default router;
//# sourceMappingURL=payrun.routes.js.map