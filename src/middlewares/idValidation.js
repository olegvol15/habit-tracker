import { BadRequestError } from "../errors/AppError.js";

export function idValidator(req, _res, next) {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
    return next(new BadRequestError("Invalid id"));
  }

  req.params.id = id;
  return next();
}