import fs from "fs";
import path from "path";
import prisma from "../../db/prisma";
import { NotFoundError } from "../../errors/AppError";
import { mapPrismaError } from "../../errors/mapPrismaError";
import { calcHighestStreak } from "../../utils/calcStreak";

const omitPasswordHash = { passwordHash: true } as const;

export async function getUsersService() {
  return await prisma.user.findMany({ omit: omitPasswordHash });
}

export async function getUserService(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: omitPasswordHash,
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const habits = await prisma.habit.findMany({
      where: { userId: id },
      include: { checkins: { select: { date: true } } },
    });

    const highestStreak = habits.reduce((best, habit) => {
      return Math.max(best, calcHighestStreak(habit.checkins.map((c) => c.date)));
    }, 0);

    return { user, highestStreak };
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function createUserService(email: string) {
  try {
    return await prisma.user.create({
      data: { email },
      omit: omitPasswordHash,
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function updateProfileService(
  id: number,
  data: { name?: string | null; email?: string, timezone?: string; avatarUrl?: string | null },
) {
  try {
    return await prisma.user.update({
      where: { id },
      data,
      omit: omitPasswordHash,
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function uploadAvatarService(id: number, filename: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id }, select: { avatarUrl: true } });

    // Delete old avatar file if it was locally uploaded
    if (user?.avatarUrl?.startsWith("/uploads/avatars/")) {
      const oldPath = path.join(process.cwd(), user.avatarUrl);
      fs.unlink(oldPath, () => {});
    }

    return await prisma.user.update({
      where: { id },
      data: { avatarUrl: `/uploads/avatars/${filename}` },
      omit: omitPasswordHash,
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function deleteUserService(id: number) {
  try {
    return await prisma.user.delete({
      where: { id },
      omit: omitPasswordHash,
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}
