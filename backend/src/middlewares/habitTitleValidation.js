import { BadRequestError } from "../errors/AppError.js";

export function habitTitleValidator(req, _res, next) {
  const {title} = req.body;

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