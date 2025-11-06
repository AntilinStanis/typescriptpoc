import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

const router: Router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post('', authController.signup);

export default router;