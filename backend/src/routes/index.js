import { Router } from "express";
import usersRouter from "../modules/users/users.routes.js"
import habitsRouter from "../modules/habits/habits.routes.js"
import todayRouter from "../modules/today/today.routes.js"
import authRouter from "../modules/auth/auth.routes.js"

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));

router.use("/users", usersRouter);
router.use("/habits", habitsRouter)
router.use("/today", todayRouter)
router.use("/auth", authRouter)

export default router;