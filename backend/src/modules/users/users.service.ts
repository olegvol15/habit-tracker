import prisma from "../../db/prisma";
import { NotFoundError } from "../../errors/AppError";
import { mapPrismaError } from "../../errors/mapPrismaError";

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

    return user;
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

export async function updateEmailService(id: number, email: string) {
  try {
    return await prisma.user.update({
      where: { id },
      data: { email },
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
