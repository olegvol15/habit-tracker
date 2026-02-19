import { Router } from "express";
import { emailValidator } from "../../middlewares/validators/emailValidation.js";
import { passwordValidator } from "../../middlewares/validators/passwordValidation.js";
import { requireAuth } from "../../middlewares/auth/requireAuth.js";
import {
  getMeController,
  loginController,
  logoutController,
  registerController,
} from "./auth.controller.js";
import { authLimiter } from "../../middlewares/rateLimiters.js";

const router = Router({
  mergeParams: true,
});

router.post("/register", authLimiter, emailValidator, passwordValidator, registerController);
router.post("/login", authLimiter, emailValidator, passwordValidator, loginController);
router.get("/me", requireAuth, getMeController);
router.post("/logout", requireAuth, logoutController);

export default router;