import { BadRequestError } from "../../errors/AppError.js";
import { createUserService, getUserService, getUsersService } from "./users.service.js";

export async function getUsers(req, res, next) {
  try {
    const users = await getUsersService();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("Invalid id")
    }

    const user = await getUserService(id);
    return res.json(user)
  } catch (err) {
    return next(err);
  }
}
export async function createUser(req, res, next) {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      throw new BadRequestError("Valid email is required");
    }

    const user = await createUserService(email);
    return res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
}