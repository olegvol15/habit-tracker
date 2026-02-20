import type { Request, Response, NextFunction } from "express";
import { getTodayService } from "./today.service";

export async function getToday(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const habits = await getTodayService(userId);
    return res.json(habits);
  } catch (err) {
    return next(err);
  }
}
