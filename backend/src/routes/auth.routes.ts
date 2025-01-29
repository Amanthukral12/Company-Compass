import { Router } from "express";
import passport from "passport";
import {
  getCurrentCompany,
  getCurrentSession,
  googleLoginSuccess,
} from "../controller/auth.controller";
import { trackDeviceInfo } from "../middleware/deviceInfo";
import { authenticateSession } from "../middleware/auth";

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

router.route("/auth/session").get(authenticateSession, getCurrentSession);
router.route("/auth/profile").get(authenticateSession, getCurrentCompany);

export default router;
