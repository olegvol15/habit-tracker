import type { Request, Response, NextFunction } from "express";
import {
  deleteUserService,
  getUserService,
  updateProfileService,
} from "./users.service";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUserService(req.userId);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, timezone, avatarUrl } = req.body;

    const user = await updateProfileService(req.userId, { name, email, timezone, avatarUrl });
    return res.json({ user });
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
