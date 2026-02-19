import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();
app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
app.use(errorHandler);

export default app;
