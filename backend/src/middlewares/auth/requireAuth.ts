import type { Request, Response, NextFunction } from "express";
import prisma from "../../db/prisma";
import { UnauthorizedError } from "../../errors/AppError";

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const sessionId = req.cookies?.session;
    if (!sessionId) throw new UnauthorizedError("Unauthorized");

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      select: { id: true, userId: true, expires: true },
    });

    if (!session) throw new UnauthorizedError("Unauthorized");

    if (session.expires && session.expires < new Date()) {
      await prisma.session.delete({ where: { id: sessionId } });
      throw new UnauthorizedError("Session expired");
    }

    req.userId = session.userId;
    req.sessionId = session.id;

    next();
  } catch (err) {
    next(err);
  }
}
