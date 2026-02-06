import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateEmail,
  deleteUser
} from "./users.controller.js";
import { emailValidator } from "../../middlewares/emailValidation.js";
import { idValidator } from "../../middlewares/idValidation.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", idValidator, getUser);
router.patch("/:id", idValidator, emailValidator, updateEmail);
router.post("/", emailValidator, createUser);
router.delete("/:id", idValidator, deleteUser);

export default router;
