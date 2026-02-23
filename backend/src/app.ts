import express from "express";
import path from "path";
import "./config/passport";
import routes from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const app = express();
app.set("trust proxy", 1);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);
app.use(errorHandler);

export default app;
