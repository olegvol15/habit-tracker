import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../errors/AppError";

export function habitTitleValidator(req: Request, _res: Response, next: NextFunction) {
  const { title } = req.body;

  if (typeof title != "string") {
    return next(new BadRequestError("Title must be string"));
  }

  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    return next(new BadRequestError("Title is required"));
  }

  if (normalizedTitle.length > 100) {
    return next(new BadRequestError("Title is too long!"));
  }

  if (normalizedTitle.length < 2) {
    return next(new BadRequestError("Title is too short!"));
  }

  req.body.title = normalizedTitle;
  return next();
}
