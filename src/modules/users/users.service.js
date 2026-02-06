import prisma from "../../db/prisma.js";
import { NotFoundError } from "../../errors/AppError.js";
import { mapPrismaError } from "../../errors/mapPrismaError.js";

export async function getUsersService() {
  return await prisma.user.findMany();
}

export async function getUserService(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {id}
    })

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
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}
