import { Router } from "express";
import { paramIdValidator } from "../../middlewares/idValidation.js";
import { getHabits } from "./habits.controller.js";


const router = Router({
  mergeParams: true,
});

router.get("/", paramIdValidator("userId"), getHabits)
router.post("/users/:userId/habits", paramIdValidator)
router.post("/users/:userId/habits/:habitId/checkins", paramIdValidator)
console.log("HIT habits route")
export default router;