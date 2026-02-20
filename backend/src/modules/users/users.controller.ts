import type { Request, Response, NextFunction } from "express";
import {
  deleteUserService,
  getUserService,
  updateEmailService,
} from "./users.service";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUserService(req.userId);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

export async function updateEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    const user = await updateEmailService(req.userId, email);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteUserService(req.userId);
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
}
