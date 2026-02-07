import { Router } from "express";
import usersRouter from "../modules/users/users.routes.js"
import habitsRouter from "../modules/habits/habits.routes.js"

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));

router.use("/users", usersRouter);
router.use("/users/:userId/habits", habitsRouter)

export default router;