const COOKIE_NAME = "session";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
export function setSessionCookie(res, sessionId) {
  res.cookie(COOKIE_NAME, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // in prod https
    path: "/",
    maxAge: THIRTY_DAYS_MS,
  })
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });
}