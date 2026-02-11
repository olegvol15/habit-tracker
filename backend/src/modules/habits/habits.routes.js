import { Router } from "express";
import { paramIdValidator } from "../../middlewares/validators/idValidation.js";
import { createCheckin, createHabit, getHabits } from "./habits.controller.js";
import { habitTitleValidator } from "../../middlewares/validators/habitTitleValidation.js";

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
