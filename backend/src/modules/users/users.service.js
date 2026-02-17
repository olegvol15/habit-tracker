import prisma from "../../db/prisma.js";
import { NotFoundError } from "../../errors/AppError.js";
import { mapPrismaError } from "../../errors/mapPrismaError.js";

const omitPasswordHash = { passwordHash: true };

export async function getUsersService() {
  return await prisma.user.findMany({ omit: omitPasswordHash });
}

export async function getUserService(id) {
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

export async function createUserService(email) {
  try {
    return await prisma.user.create({
      data: { email },
      omit: omitPasswordHash,
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function updateEmailService(id, email) {
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

export async function deleteUserService(id) {
  try {
    return await prisma.user.delete({
      where: { id },
      omit: omitPasswordHash,
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}
