import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateEmail,
  deleteUser
} from "./users.controller.js";
import { emailValidator } from "../../middlewares/emailValidation.js";
import { paramIdValidator } from "../../middlewares/idValidation.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", paramIdValidator, getUser);
router.patch("/:id", paramIdValidator, emailValidator, updateEmail);
router.post("/", emailValidator, createUser);
router.delete("/:id", paramIdValidator, deleteUser);

export default router;
