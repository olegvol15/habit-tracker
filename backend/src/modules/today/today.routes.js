import { Router } from "express";
import { paramIdValidator } from "../../middlewares/idValidation.js";
import { getToday } from "./today.controller.js";

const router = Router({
  mergeParams: true,
})

router.get("/", paramIdValidator("userId"), getToday);

export default router;