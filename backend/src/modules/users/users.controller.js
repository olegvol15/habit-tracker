import {
  deleteUserService,
  getUserService,
  updateEmailService,
} from "./users.service.js";

export async function getUser(req, res, next) {
  try {
    const user = await getUserService(req.userId);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

export async function updateEmail(req, res, next) {
  try {
    const { email } = req.body;

    const user = await updateEmailService(req.userId, email);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await deleteUserService(req.userId);
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
}
