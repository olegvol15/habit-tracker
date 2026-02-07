import prisma from "../../db/prisma.js";
import { NotFoundError } from "../../errors/AppError.js";
import { mapPrismaError } from "../../errors/mapPrismaError.js";

export async function getHabitsService(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {id: true}
    });

    if (!user) {
      throw new NotFoundError("User not found")
    }

    return await prisma.habit.findMany({
      where: {userId},
      orderBy: {createdAt: "desc"}
    })
  } catch (err) {
    throw mapPrismaError(err);
  }
  
}
