import { BadRequestError } from "../../errors/AppError.js";
import {
  createUserService,
  deleteUserService,
  getUserService,
  getUsersService,
  updateEmailService,
} from "./users.service.js";

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
    const { id } = req.params;

    const user = await getUserService(id);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}
export async function createUser(req, res, next) {
  try {
    const { email } = req.body;

    const user = await createUserService(email);
    return res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
}

export async function updateEmail(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const user = await updateEmailService(id, email);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    await deleteUserService(id);
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
}
