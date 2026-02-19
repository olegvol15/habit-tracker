import rateLimit from "express-rate-limit";
import { rateLimitHandler, userOrIpKey } from "../utils/limitHelpers.js";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many auth attempts. Try again later" },
  handler: rateLimitHandler,
});

export const authedLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 180,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: userOrIpKey,
  message: { error: "Too many requests. Slow down." },
  handler: rateLimitHandler,
});

export const checkinsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: userOrIpKey,
  message: { error: "Too many checkins. Slow down" },
  handler: rateLimitHandler,
});
