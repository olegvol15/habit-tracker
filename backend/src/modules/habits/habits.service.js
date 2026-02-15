import prisma from "../../db/prisma.js";
import { NotFoundError } from "../../errors/AppError.js";
import { mapPrismaError } from "../../errors/mapPrismaError.js";
import { addDaysUTC, toYMD } from "../../utils/addDaysUTC.js";
import { BadRequestError } from "../../errors/AppError.js";

export async function getHabitsService(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, timezone: true },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return await prisma.habit.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function getHabitsWeekService({ userId, start, startDate }) {
  if (!userId) throw new BadRequestError("userId is required");

  let startDt = startDate;

  if (!startDt) {
    if (typeof start !== "string") throw new BadRequestError("start is required");
    startDt = new Date(`${start}T00:00:00.000Z`);
    if (Number.isNaN(startDt.getTime()) || toYMD(startDt) !== start) {
      throw new BadRequestError("start is not a valid date");
    }
  }

  const endExclusive = addDaysUTC(startDt, 7);

  const days = Array.from({ length: 7 }, (_, i) =>
    toYMD(addDaysUTC(startDt, i))
  );

  const habits = await prisma.habit.findMany({
    where: { userId, isActive: true },
    select: { id: true, title: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const checkinsRaw = await prisma.checkin.findMany({
    where: {
      userId,
      date: {
        gte: startDt,
        lt: endExclusive,
      },
    },
    select: { habitId: true, date: true },
  });

  const checkins = {};
  for (const c of checkinsRaw) {
    const habitKey = String(c.habitId);
    const dateStr = c.date instanceof Date ? toYMD(c.date) : String(c.date);

    if (!checkins[habitKey]) checkins[habitKey] = {};
    checkins[habitKey][dateStr] = true;
  }

  return { days, habits, checkins };
}

export async function createHabitService(title, userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return await prisma.habit.create({
      data: { title, userId },
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function toggleCheckinService(userId, habitId, dateStr) {
  try {
    const habit = await prisma.habit.findFirst({
      where: { id: habitId, userId },
      select: { id: true },
    });

    if (!habit) {
      throw new NotFoundError("Habit not found");
    }

    const date = new Date(`${dateStr}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestError("Invalid date");
    }

    const existing = await prisma.checkin.findUnique({
      where: {
        userId_habitId_date: { userId, habitId, date },
      },
    });

    if (existing) {
      await prisma.checkin.delete({
        where: { id: existing.id },
      });
      return { habitId, date: dateStr, checked: false };
    }

    await prisma.checkin.create({
      data: { habitId, userId, date },
    });
    return { habitId, date: dateStr, checked: true };
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function deleteHabitService({ userId, habitId }) {
  try {
    const habit = await prisma.habit.findFirst({
      where: { id: habitId, userId },
      select: { id: true },
    });

    if (!habit) {
      throw new NotFoundError("Habit not found");
    }

    return await prisma.habit.delete({
      where: { id: habitId },
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}
