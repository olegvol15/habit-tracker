import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../errors/AppError";

function parseYmdToUtcDate(ymd: string): Date | null {
  const d = new Date(`${ymd}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return null;
  if (d.toISOString().slice(0, 10) !== ymd) return null;
  return d;
}

export function startDateValidator(req: Request, _res: Response, next: NextFunction) {
  const start = req.query.start;

  if (typeof start !== "string") {
    return next(new BadRequestError("Query param 'start' is required"));
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(start)) {
    return next(new BadRequestError("Query param 'start' must be YYYY-MM-DD"));
  }

  const startDate = parseYmdToUtcDate(start);
  if (!startDate) {
    return next(new BadRequestError("Query param 'start' is not a valid date"));
  }

  req.validated ??= {};
  req.validated.start = start;
  req.validated.startDate = startDate;

  return next();
}
