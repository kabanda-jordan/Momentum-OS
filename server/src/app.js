import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Auth routes are the most common abuse target, so we rate-limit them separately.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many auth requests. Please try again later."
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
