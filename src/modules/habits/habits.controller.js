import { getHabitsService } from "./habits.service.js";

export async function getHabits(req, res, next) {
  try {
    const userId = req.params.userId;
    const habits = await getHabitsService(userId);
    return res.json(habits);
  } catch (err) {
    return next(err);
  }
}
