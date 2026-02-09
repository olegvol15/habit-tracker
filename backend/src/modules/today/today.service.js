import prisma from "../../db/prisma.js";
import { mapPrismaError } from "../../errors/mapPrismaError.js";
import { getLocalDayDate } from "../../utils/getLocalDayDate.js";
import { NotFoundError } from "../../errors/AppError.js";

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
          where: { date: todayDate },
          select: { id: true },
          take: 1,
        },
      },
    });

    return habits.map(({ checkins, ...habit }) => ({
      ...habit,
      checkedToday: checkins.length > 0,
    }));
  } catch (err) {
    throw mapPrismaError(err);
  }
}
