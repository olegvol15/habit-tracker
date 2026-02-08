import { getTodayService } from "./today.service.js";

export async function getToday(req, res, next) {
  try {
    const userId = req.params.userId;
    const habits = await getTodayService(userId);
    return res.json(habits);
  } catch (err) {
    return next(err);
  }
}