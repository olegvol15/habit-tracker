import { Router } from "express";
import usersRouter from "../modules/users/users.routes.js";
import habitsRouter from "../modules/habits/habits.routes.js";
import todayRouter from "../modules/today/today.routes.js";
import authRouter from "../modules/auth/auth.routes.js";
import { authedLimiter } from "../middlewares/rateLimiters.js";

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));

router.use("/users", authedLimiter, usersRouter);
router.use("/habits", authedLimiter, habitsRouter);
router.use("/today", authedLimiter, todayRouter);
router.use("/auth", authedLimiter, authRouter);

export default router;
