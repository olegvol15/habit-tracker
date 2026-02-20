import { Router } from "express";
import {
  getUser,
  updateEmail,
  deleteUser
} from "./users.controller";
import { emailValidator } from "../../middlewares/validators/emailValidation";
import { requireAuth } from "../../middlewares/auth/requireAuth";

const router = Router();

router.use(requireAuth);

router.get("/me", getUser);
router.patch("/me", emailValidator, updateEmail);
router.delete("/me", deleteUser);

export default router;
