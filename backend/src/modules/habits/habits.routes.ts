import { Router } from "express";
import { paramIdValidator } from "../../middlewares/validators/idValidation";
import {
  createCheckin,
  createHabit,
  getHabits,
  getWeekHabits,
  editHabit,
  deleteHabit,
} from "./habits.controller";
import { habitTitleValidator } from "../../middlewares/validators/habitTitleValidation";
import { requireAuth } from "../../middlewares/auth/requireAuth";
import { startDateValidator } from "../../middlewares/validators/startDateValidation";
import { checkinsLimiter } from "../../middlewares/rateLimiters";

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.get("/", getHabits);

router.get("/week", startDateValidator, getWeekHabits);

router.post("/", habitTitleValidator, createHabit);

router.post(
  "/:habitId/checkins",
  paramIdValidator("habitId"),
  checkinsLimiter,
  createCheckin,
);

router.patch(
  "/:habitId",
  paramIdValidator("habitId"),
  habitTitleValidator,
  editHabit,
);

router.delete("/:habitId", paramIdValidator("habitId"), deleteHabit);

export default router;
