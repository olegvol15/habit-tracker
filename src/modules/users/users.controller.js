import { BadRequestError } from "../../errors/AppError.js";
import { createUserService } from "./users.service.js";

export async function createUser(req, res, next) {
  try {
    const {email} = req.body;

    if(!email || typeof(email) !== "string") {
      throw new BadRequestError("Valid email is required")
    }

    const user = await createUserService(email);
    return res.status(201).json(user);
  } catch (err) {
    return next;''
  }
}