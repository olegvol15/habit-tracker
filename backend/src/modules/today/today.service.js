import prisma from "../../db/prisma.js";
import { mapPrismaError } from "../../errors/mapPrismaError.js";
import { getLocalDayDate } from "../../utils/getLocalDayDate.js";
import { NotFoundError } from "../../errors/AppError.js";
import { calcStreak } from "../../utils/calcStreak.js";

export async function getTodayService(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, timezone: true },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const todayDate = getLocalDayDate(user.timezone);

    const habits = await prisma.habit.findMany({
      where: {
        userId,
        isActive: true,
      },
      orderBy: { createdAt: "desc" },
      include: {
        checkins: {
          select: { id: true, date: true },
          orderBy: { date: "desc" },
        },
      },
    });

    return habits.map(({ checkins, ...habit }) => ({
      ...habit,
      checkedToday: checkins.some(
        (c) => c.date.toISOString().slice(0, 10) === todayDate.toISOString().slice(0, 10),
      ),
      streak: calcStreak(
        checkins.map((c) => c.date),
        todayDate,
      ),
    }));
  } catch (err) {
    throw mapPrismaError(err);
  }
}
