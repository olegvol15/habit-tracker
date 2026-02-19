import { BadRequestError } from "../../errors/AppError.js";

export function paramIdValidator(paramName) {
  
  return function (req, _res, next) {
    const raw = req.params[paramName];
    const id = Number(raw);

    if (Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return next(new BadRequestError(`Invalid ${paramName}`));
    }

    req.params[paramName] = id;
    return next();
  };
}