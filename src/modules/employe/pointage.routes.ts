import { Router } from "express";
import { PointageController, PresenceController } from "./pointage.controller.js";
import AuthMiddleware from "../auth/auth.middelware.js";

const PointageRouter = Router();

// Routes publiques (sans authentification)
PointageRouter.post("/validate-qr", PointageController.validateQRCode);
PointageRouter.get("/employe/:employeId", PointageController.findByEmploye);

// Appliquer le middleware d'authentification aux routes suivantes
PointageRouter.use(AuthMiddleware.TokenVerifed);

// Routes protégées
PointageRouter.get("/entreprise/:entrepriseId/qr-code", PointageController.generateCompanyQRCode);

// Routes pour les pointages (protégées)
PointageRouter.post("/", PointageController.create);
PointageRouter.get("/", PointageController.findAll);
PointageRouter.get("/stats", PointageController.getStats);
PointageRouter.get("/:employeId/can-checkin", PointageController.canCheckIn);
PointageRouter.get("/:employeId/qr-code", PointageController.generateQRCode);
PointageRouter.get("/employe/:employeId", PointageController.findByEmploye);
PointageRouter.get("/entreprise/:entrepriseId", PointageController.findByEntreprise);
PointageRouter.get("/entreprise/:entrepriseId/report", PointageController.generateAttendanceReport);

// Routes pour les présences
PointageRouter.get("/presence/employe/:employeId", PresenceController.findByEmploye);
PointageRouter.get("/presence/calculate/:employeId/:year/:month", PresenceController.calculateMonthlyHours);
PointageRouter.post("/presence/absence/:employeId", PresenceController.markAbsence);
PointageRouter.post("/presence/leave/:employeId", PresenceController.markLeave);

export default PointageRouter;