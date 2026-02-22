import { Router } from "express";
import {
  getUser,
  updateProfile,
  deleteUser
} from "./users.controller";
import { requireAuth } from "../../middlewares/auth/requireAuth";
import { profileValidator } from "../../middlewares/validators/profileValidator";

const router = Router();

router.use(requireAuth);

router.get("/me", getUser);
router.patch("/me", profileValidator, updateProfile);
router.delete("/me", deleteUser);

export default router;
