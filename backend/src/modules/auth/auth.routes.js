import { Router } from "express";
import { emailValidator } from "../../middlewares/emailValidation.js";
import { passwordValidator } from "../../middlewares/passwordValidation.js";

const router = Router({
  mergeParams: true,
});

router.post("/register", emailValidator, passwordValidator)