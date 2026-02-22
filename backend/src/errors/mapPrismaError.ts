import { Prisma } from "@prisma/client";
import { ConflictError, NotFoundError } from "./AppError";

export function mapPrismaError(err: unknown): unknown {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        const fields = err.meta?.target;
        const isEmail =
          Array.isArray(fields)
            ? fields.includes("email")
            : typeof fields === "string" && fields.includes("email");
        return new ConflictError(
          isEmail ? "Email address is already in use" : "Resource already exists"
        );
      }
      case "P2025":
        return new NotFoundError("Resource not found");
    }
  }

  return err;
}
