import { Router } from "express";
import { paramIdValidator } from "../../middlewares/validators/idValidation";
import { getToday } from "./today.controller";
import { requireAuth } from "../../middlewares/auth/requireAuth";

const router = Router({
  mergeParams: true,
})

router.use(requireAuth);

router.get("/", getToday);

export default router;