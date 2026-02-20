import type { Request, Response } from "express";
import { ipKeyGenerator, type Options } from "express-rate-limit";

export function userOrIpKey(req: Request): string {
  if (req.userId) {
    return `user:${req.userId}`;
  }
  return `ip:${ipKeyGenerator(req.ip ?? "unknown")}`;
}

export function rateLimitHandler(req: Request, res: Response, _next: unknown, options: Options) {
  const retryAfterHeader = res.getHeader("Retry-After");
  const retryAfterSeconds = retryAfterHeader ? Number(retryAfterHeader) : Math.ceil(options.windowMs / 1000);

  return res.status(429).json({
    error: "RATE_LIMITED",
    message: typeof options.message === "string" ? options.message : (options.message as Record<string, string>)?.error ?? "Too many requests.",
    retryAfterSeconds,
  });
}
