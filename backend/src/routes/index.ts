import { Router } from "express";
import usersRouter from "../modules/users/users.routes";
import habitsRouter from "../modules/habits/habits.routes";
import todayRouter from "../modules/today/today.routes";
import authRouter from "../modules/auth/auth.routes";
import { authedLimiter } from "../middlewares/rateLimiters";

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));

router.use("/users", authedLimiter, usersRouter);
router.use("/habits", authedLimiter, habitsRouter);
router.use("/today", authedLimiter, todayRouter);
router.use("/auth", authRouter);

export default router;
