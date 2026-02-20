declare namespace Express {
  interface Request {
    userId: number;
    sessionId: string;
    validated?: Record<string, unknown>;
  }
}
