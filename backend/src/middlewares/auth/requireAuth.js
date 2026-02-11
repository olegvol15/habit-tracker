import prisma from "../../db/prisma.js";
import { UnauthorizedError } from "../../errors/AppError.js";

export async function requireAuth(req, _res, next) {
  const sessionId = req.cookies?.session;

  if(!sessionId) {
    throw new UnauthorizedError("Unauthenticated")
  }

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId
    }
  })

  if (!session) {
    throw new UnauthorizedError("Unauthenticated")
  }

  if (sessionExist.expires < new Date()) {
    await prisma.session.delete({
      where: {
        id: sessionId
      }
    })

    throw new UnauthorizedError("Unauthenticated");
  }

  req.userId = session.userId;

  return next()
}