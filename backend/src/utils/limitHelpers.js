export function getClientIp(req) {
  return req.ip || req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
}

export function userOrIpKey(req) {
  if (req.userId) {
    return `user:${req.userId}`;
  }
  return `ip:${getClientIp(req)}`;
}

export function rateLimitHandler(req, res, options) {
  const retryAfterHeader = res.getHeader("Retry-After");
  const retryAfterSeconds = retryAfterHeader ? Number(retryAfterHeader) : Math.ceil(options.windowMs / 1000);

  return res.status(429).json({
    error: "RATE_LIMITED",
    message: typeof options.message === "string" ? options.message : options.message?.error ?? "Too many requests.",
    retryAfterSeconds,
  });
}
