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

const router = Router({
  mergeParams: true,
});

router.post("/register", emailValidator, passwordValidator, registerController);
router.post("/login", emailValidator, passwordValidator, loginController);
router.get("/me", requireAuth, getMeController);
router.post("/logout", logoutController);

export default router;