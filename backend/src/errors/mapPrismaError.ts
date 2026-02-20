import { Prisma } from "@prisma/client";
import { ConflictError, NotFoundError } from "./AppError";

export function mapPrismaError(err: unknown): unknown {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return new ConflictError("Resource already exists");
      case "P2025":
        return new NotFoundError("Resource not found");
    }
  }

  return err;
}
