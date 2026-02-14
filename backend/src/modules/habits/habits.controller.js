import {
  createCheckinService,
  createHabitService,
  deleteHabitService,
  getHabitsService,
  getHabitsWeekService
} from "./habits.service.js";

export async function getHabits(req, res, next) {
  try {
    const userId = req.userId;
    const habits = await getHabitsService(userId);
    return res.json(habits);
  } catch (err) {
    return next(err);
  }
}

export async function getWeekHabits(req, res, next) {
  try {
    const userId = req.userId;
    const start = req.validated?.start ?? req.query.start;

    const data = await getHabitsWeekService({ start, userId });

    return res.json(data);
  } catch (err) {
    return next(err);
  }
}

export async function createHabit(req, res, next) {
  try {
    const { title } = req.body;
    const userId = req.userId;

    const habit = await createHabitService(title, userId);
    return res.status(201).json(habit);
  } catch (err) {
    return next(err);
  }
}

export async function createCheckin(req, res, next) {
  try {
    const userId = req.userId;
    const habitId = req.params.habitId;

    const checkin = await createCheckinService(userId, habitId);
    return res.status(201).json(checkin);
  } catch (err) {
    return next(err);
  }
}

export async function deleteHabit(req, res, next) {
  try {
    const userId = req.userId;
    const habitId = req.params.habitId;

    await deleteHabitService({userId, habitId});
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
}

