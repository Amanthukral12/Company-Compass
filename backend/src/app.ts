import express from "express";
import dotenv from "dotenv";
import passport from "./config/passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";
import attendanceRoutes from "./routes/attendance.routes";
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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/employee", employeeRoutes);
app.use("/attendance", attendanceRoutes);
export default app;
