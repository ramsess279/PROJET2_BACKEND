import { Router } from "express";
import AuthController from "./auth.controller.js";
import AuthMiddleware from "./auth.middelware.js";
import { requireRole } from "./role.middleware.js";
const AuthRouter = Router();
AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/logout", AuthController.logout);
AuthRouter.post("/refresh", AuthController.refresh);
AuthRouter.post("/switch-company", AuthMiddleware.TokenVerifed, requireRole("super-admin"), AuthController.switchCompany);
AuthRouter.patch("/profile", AuthMiddleware.TokenVerifed, AuthController.updateProfile);
export default AuthRouter;
//# sourceMappingURL=auth.routes.js.map