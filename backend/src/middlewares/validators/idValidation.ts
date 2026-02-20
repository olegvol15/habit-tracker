import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../errors/AppError";

export function paramIdValidator(paramName: string) {
  return function (req: Request, _res: Response, next: NextFunction) {
    const raw = req.params[paramName];
    const id = Number(raw);

    if (Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return next(new BadRequestError(`Invalid ${paramName}`));
    }

    (req.params as Record<string, unknown>)[paramName] = id;
    return next();
  };
}
