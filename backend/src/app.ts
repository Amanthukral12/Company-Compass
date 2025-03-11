import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import dotenv from "dotenv";
import passport from "./config/passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";
import attendanceRoutes from "./routes/attendance.routes";
import { ApiError } from "./utils/ApiError";
const app = express();
dotenv.config();

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

console.log(process.env.CORS_ORIGIN);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/employee", employeeRoutes);
app.use("/attendance", attendanceRoutes);
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [err.message],
      data: null,
    });
    return;
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [err.message || "An unexpected error occurred"],
    data: null,
  });
};

app.use(errorHandler);
export default app;
