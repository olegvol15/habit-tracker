import { Router } from "express";
import { createUser, getUsers, getUser } from "./users.controller.js";

const router = Router();

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", createUser);

export default router;