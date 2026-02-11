import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateEmail,
  deleteUser
} from "./users.controller.js";
import { emailValidator } from "../../middlewares/validators/emailValidation.js";
import { paramIdValidator } from "../../middlewares/validators/idValidation.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", paramIdValidator("id"), getUser);
router.patch("/:id", paramIdValidator("id"), emailValidator, updateEmail);
router.post("/", emailValidator, createUser);
router.delete("/:id", paramIdValidator("id"), deleteUser);

export default router;
