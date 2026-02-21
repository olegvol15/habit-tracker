import prisma from "../../db/prisma";
import { BadRequestError, UnauthorizedError } from "../../errors/AppError";
import bcrypt from "bcryptjs";
import { toPublicUser } from "../../utils/toPublicUser";
import { mapPrismaError } from "../../errors/mapPrismaError";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export async function findOrCreateGoogleUser(profile: {
  id: string;
  email: string | undefined;
  name: string | null;
  avatarUrl: string | null;
}) {
  const { id: googleId, email, name, avatarUrl } = profile;

  if (!email) {
    throw new BadRequestError("Google account has no email address");
  }

  try {
    // Case 1: already linked Google account
    const byGoogleId = await prisma.user.findUnique({ where: { googleId } });
    if (byGoogleId) return byGoogleId;

    // Case 2: email exists (password account) — auto-link
    const byEmail = await prisma.user.findUnique({ where: { email } });
    if (byEmail) {
      return prisma.user.update({
        where: { id: byEmail.id },
        data: {
          googleId,
          avatarUrl: byEmail.avatarUrl ?? avatarUrl,
        },
      });
    }

    // Case 3: brand new user
    return prisma.user.create({
      data: { email, googleId, name, avatarUrl },
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}

export async function createSessionForUser(userId: number) {
  try {
    return prisma.session.create({
      data: {
        userId,
        expires: new Date(Date.now() + SESSION_TTL_MS),
      },
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
}

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

    const session = await createSessionForUser(user.id);

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

    const session = await createSessionForUser(user.id);

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
