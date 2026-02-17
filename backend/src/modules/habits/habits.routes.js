import { Router } from "express";
import { paramIdValidator } from "../../middlewares/validators/idValidation.js";
import {
  createCheckin,
  createHabit,
  getHabits,
  getWeekHabits,
  editHabit,
  deleteHabit
} from "./habits.controller.js";
import { habitTitleValidator } from "../../middlewares/validators/habitTitleValidation.js";
import { requireAuth } from "../../middlewares/auth/requireAuth.js";
import { startDateValidator } from "../../middlewares/validators/startDateValidation.js";

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.get("/", getHabits);

router.get("/week", startDateValidator, getWeekHabits);

router.post("/", habitTitleValidator, createHabit);

router.post("/:habitId/checkins", paramIdValidator("habitId"), createCheckin);

router.patch("/:habitId", paramIdValidator("habitId"), habitTitleValidator, editHabit)

router.delete("/:habitId", paramIdValidator("habitId"), deleteHabit)

export default router;
