import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../errors/AppError";

export function profileValidator(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { name, email, timezone, avatarUrl } = req.body;

  if (name !== undefined) {
    if (typeof name !== "string") {
      return next(new BadRequestError("Name must be a string"));
    }
    const trimmed = name.trim();
    if (!trimmed) {
      return next(new BadRequestError("Name cannot be empty"));
    }
    if (trimmed.length > 100) {
      return next(new BadRequestError("Name is too long"));
    }
    req.body.name = trimmed;
  }

  if (email !== undefined) {
    if (typeof email !== "string") {
      return next(new BadRequestError("Email must be a string"));
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      return next(new BadRequestError("Email cannot be empty"));
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
    if (
      !domain.includes(".") ||
      domain.startsWith(".") ||
      domain.endsWith(".")
    ) {
      return next(new BadRequestError("Email format is invalid"));
    }
    req.body.email = normalizedEmail;
  }

  if (timezone !== undefined) {
    if (!Intl.supportedValuesOf("timeZone").includes(timezone)) {
      return next(new BadRequestError("Invalid format for timezone"));
    }
  }

  if (avatarUrl !== undefined && avatarUrl !== null) {
    if (typeof avatarUrl !== "string" || !avatarUrl.trim()) {
      return next(new BadRequestError("Avatar URL must be a non-empty string"));
    }

    if (avatarUrl.length > 500) {
      return next(new BadRequestError("Avatar URL is too long"));
    }
  }

  return next();
}
