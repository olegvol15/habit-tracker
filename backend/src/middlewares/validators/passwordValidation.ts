import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../errors/AppError";

export function passwordValidator(req: Request, _res: Response, next: NextFunction) {
  const { password } = req.body;

  if (!password) {
    return next(new BadRequestError("Password is required"));
  }

  if (typeof password !== "string") {
    return next(new BadRequestError("Password must be a string"));
  }

  if (password.length < 8) {
    return next(new BadRequestError("Password is too short"));
  }

  if (password.length > 100) {
    return next(new BadRequestError("Password is too long"));
  }

  return next();
}

export function passwordStrengthValidator(req: Request, _res: Response, next: NextFunction) {
  const { password } = req.body;

  if (!/[!@#$%^&*]/.test(password)) {
    return next(new BadRequestError("Password must contain at least one special character"));
  }

  if (!/[0-9]/.test(password)) {
    return next(new BadRequestError("Password must contain at least one number"));
  }

  return next();
}
