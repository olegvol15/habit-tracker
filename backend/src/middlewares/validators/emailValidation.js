import { BadRequestError } from "../../errors/AppError.js";

export function emailValidator(req, _res, next) {
  const { email } = req.body;

  if (typeof email !== "string") {
    return next(new BadRequestError("Email must be a string"));
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return next(new BadRequestError("Email is required"));
  }

  const atIndex = normalizedEmail.indexOf("@");

  if (
    atIndex <= 0 ||
    atIndex !== normalizedEmail.lastIndexOf("@") ||
    atIndex === normalizedEmail.length - 1
  ) {
    return next(new BadRequestError("Email format is invalid"));
  }

  const domain = normalizedEmail.slice(atIndex + 1);

  if (!domain.includes(".") || domain.startsWith(".") || domain.endsWith(".")) {
    return next(new BadRequestError("Email format is invalid"));
  }

  req.body.email = normalizedEmail;
  return next();
}