import {
  createCheckinService,
  createHabitService,
  getHabitsService,
} from "./habits.service.js";

export async function getHabits(req, res, next) {
  try {
    const userId = req.params.userId;
    const habits = await getHabitsService(userId);
    return res.json(habits);
  } catch (err) {
    return next(err);
  }
}

export async function createHabit(req, res, next) {
  try {
    const { title } = req.body;
    const userId = req.params.userId;

    const habit = await createHabitService(title, userId);
    return res.status(201).json(habit);
  } catch (err) {
    return next(err);
  }
}

export async function createCheckin(req, res, next) {
  try {
    const userId = req.params.userId;
    const habitId = req.params.habitId;

    const checkin = await createCheckinService(userId, habitId);
    return res.status(201).json(checkin);
  } catch (err) {
    return next(err);
  }
}
