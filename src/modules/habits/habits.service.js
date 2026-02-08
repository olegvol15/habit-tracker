import prisma from "../../db/prisma.js";
import { NotFoundError } from "../../errors/AppError.js";
import { mapPrismaError } from "../../errors/mapPrismaError.js";
import { getLocalDayDate } from "../../utils/getLocalDayDate.js";

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
      where: {userId},
      orderBy: {createdAt: "desc"}
    })
  } catch (err) {
    throw mapPrismaError(err);
  }
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

export async function createCheckinService(userId, habitId) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        timezone: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const habit = await prisma.habit.findFirst({
      where: { id: habitId, userId },
      select: { id: true },
    });

    if (!habit) {
      throw new NotFoundError("Habit not found");
    }

    const date = getLoclaDayDate(user.timezone);

    return await prisma.checkin.create({
      data: { habitId, userId, date },
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}
