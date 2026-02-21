import type { Request, Response, NextFunction } from "express";
import {
  clearSessionCookie,
  setSessionCookie,
} from "../../utils/sessionCookie";
import {
  createSessionForUser,
  getMeService,
  loginService,
  logoutService,
  registerService,
} from "./auth.service";
import passport from "../../config/passport";
import type { User } from "@prisma/client";

export function googleAuthController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
}

export function googleCallbackController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  passport.authenticate(
    "google",
    { session: false },
    async (err: Error | null, user: User | false) => {
      if (err) return next(err);
      const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

      if (!user) return res.redirect(`${frontendUrl}/login?error=oauth_failed`);

      try {
        const session = await createSessionForUser(user.id);
        setSessionCookie(res, session.id);
        return res.redirect(`${frontendUrl}/today`);
      } catch (err) {
        return next(err);
      }
    },
  )(req, res, next);
}

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;

    const { user, sessionId } = await loginService(email, password);
    setSessionCookie(res, sessionId);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
}

export async function getMeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { user } = await getMeService(req.userId);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
}

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
