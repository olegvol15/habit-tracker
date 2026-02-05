import { ConflictError } from "../../errors/AppError.js";

export async function createUserService(email) {
  try {
    return await prisma.user.create({
      data: { email },
    });
  } catch (err) {
    if (err?.code === "P2002") {
      throw new ConflictError("Email already exists");
    }
    throw err;
  }
}
