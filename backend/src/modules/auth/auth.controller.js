import {
  clearSessionCookie,
  setSessionCookie,
} from "../../utils/sessionCookie.js";
import {
  getMeService,
  loginService,
  logoutService,
  registerService,
} from "./auth.service.js";

export async function registerController(req, res, next) {
  try {
    const { email, password, name, timezone } = req.body;

    const { user, sessionId } = await registerService(
      email,
      password,
      name,
      timezone,
    );
    setSessionCookie(res, sessionId);
    return res.status(201).json({ user });
  } catch (err) {
    return next(err);
  }
}

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    const { user, sessionId } = await loginService(email, password);
    setSessionCookie(res, sessionId);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
}

export async function getMeController(req, res, next) {
  try {
    const { user } = await getMeService(req.userId);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
}

export async function logoutController(req, res, next) {
  try {
    const sessionId = req.cookies?.session;

    if (sessionId) {
      await logoutService(sessionId);
    }

    clearSessionCookie(res);
    return res.json({ ok: true });
  } catch (err) {
    return next(err);
  }
}
