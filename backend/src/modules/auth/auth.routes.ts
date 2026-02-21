import { Router } from "express";
import { emailValidator } from "../../middlewares/validators/emailValidation";
import { passwordValidator, passwordStrengthValidator } from "../../middlewares/validators/passwordValidation";
import { requireAuth } from "../../middlewares/auth/requireAuth";
import {
  googleAuthController,
  googleCallbackController,
  getMeController,
  loginController,
  logoutController,
  registerController,
} from "./auth.controller";
import { authLimiter } from "../../middlewares/rateLimiters";

const router = Router({
  mergeParams: true,
});

router.get("/google", authLimiter, googleAuthController);
router.get("/google/callback", authLimiter, googleCallbackController);
router.post("/register", authLimiter, emailValidator, passwordValidator, passwordStrengthValidator, registerController);
router.post("/login", authLimiter, emailValidator, passwordValidator, loginController);
router.get("/me", requireAuth, getMeController);
router.post("/logout", requireAuth, logoutController);

export default router;