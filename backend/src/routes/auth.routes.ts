import { Router } from "express";
import passport from "passport";
import { googleLoginSuccess } from "../controller/auth.controller";
import { trackDeviceInfo } from "../middleware/deviceInfo";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email"] })
);

router.get(
  "/auth/google/callback",
  trackDeviceInfo,
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleLoginSuccess
);
