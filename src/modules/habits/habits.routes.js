import { Router } from "express";
import { paramIdValidator } from "../../middlewares/idValidation.js";
import { createCheckin, createHabit, getHabits } from "./habits.controller.js";
import { habitTitleValidator } from "../../middlewares/habitTitleValidation.js";

const router = Router({
  mergeParams: true,
});

router.get("/", paramIdValidator("userId"), getHabits);
router.post("/", paramIdValidator("userId"), habitTitleValidator, createHabit);
router.post(
  "/:habitId/checkins",
  paramIdValidator("userId"),
  paramIdValidator("habitId"),
  createCheckin,
);

export default router;
