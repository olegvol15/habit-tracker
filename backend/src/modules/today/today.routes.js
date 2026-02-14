import { Router } from "express";
import { paramIdValidator } from "../../middlewares/validators/idValidation.js";
import { getToday } from "./today.controller.js";
import { requireAuth } from "../../middlewares/auth/requireAuth.js";

const router = Router({
  mergeParams: true,
})

router.use(requireAuth);

router.get("/", getToday);

export default router;