import { Router } from "express";
import AuthController from "./ auth.controller.js";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/", AuthController.login);

export default AuthRouter;