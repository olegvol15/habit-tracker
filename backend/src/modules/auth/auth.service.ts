import prisma from "../../db/prisma";
import { BadRequestError, UnauthorizedError } from "../../errors/AppError";
import bcrypt from "bcryptjs";
import { toPublicUser } from "../../utils/toPublicUser";
import { mapPrismaError } from "../../errors/mapPrismaError";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export async function registerService(email: string, password: string, name?: string | null, timezone?: string) {
  try {
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      throw new BadRequestError("Email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name ?? null,
        timezone: timezone ?? undefined,
      },
    });

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + SESSION_TTL_MS),
      },
    });

    return {
      user: toPublicUser(user),
      sessionId: session.id,
    };
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function loginService(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const ok = await bcrypt.compare(password, user.passwordHash);

    if (!ok) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + SESSION_TTL_MS),
      },
    });

    return {
      user: toPublicUser(user),
      sessionId: session.id,
    };
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function getMeService(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedError("Unauthenticated");
    }

    return {
      user: toPublicUser(user),
    };
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function logoutService(sessionId: string) {
  try {
    await prisma.session.deleteMany({
      where: {
        id: sessionId,
      },
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}
