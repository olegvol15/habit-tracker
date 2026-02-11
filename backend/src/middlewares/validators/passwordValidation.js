import { BadRequestError } from "../../errors/AppError.js";

export function passwordValidator(req, _res, next) {
  const {password} = req.body;

  if (!password) {
    return next(new BadRequestError("Password is required"))
  }

  if (typeof password !== "string") {
    return next(new BadRequestError("Password must be a string"))
  }

  if (password.length < 8) {
    return next(new BadRequestError("Password is too short"))
  }

  return next();
}