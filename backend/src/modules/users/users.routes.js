import { Router } from "express";
import {
  getUser,
  updateEmail,
  deleteUser
} from "./users.controller.js";
import { emailValidator } from "../../middlewares/validators/emailValidation.js";
import { requireAuth } from "../../middlewares/auth/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get("/me", getUser);
router.patch("/me", emailValidator, updateEmail);
router.delete("/me", deleteUser);

export default router;
