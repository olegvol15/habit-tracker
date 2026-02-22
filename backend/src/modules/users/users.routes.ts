import { Router } from "express";
import {
  getUser,
  updateProfile,
  uploadAvatar,
  deleteUser
} from "./users.controller";
import { requireAuth } from "../../middlewares/auth/requireAuth";
import { profileValidator } from "../../middlewares/validators/profileValidator";
import { uploadAvatar as uploadAvatarMiddleware } from "../../middlewares/upload";

const router = Router();

router.use(requireAuth);

router.get("/me", getUser);
router.patch("/me", profileValidator, updateProfile);
router.post("/me/avatar", uploadAvatarMiddleware, uploadAvatar);
router.delete("/me", deleteUser);

export default router;
