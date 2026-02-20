import prisma from "../../db/prisma";
import { mapPrismaError } from "../../errors/mapPrismaError";
import { getLocalDayDate } from "../../utils/getLocalDayDate";
import { NotFoundError } from "../../errors/AppError";
import { calcStreak } from "../../utils/calcStreak";

export async function getTodayService(userId: number) {
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
