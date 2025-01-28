import { Router } from "express";
import passport from "passport";
import { googleLoginSuccess } from "../controller/auth.controller";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleLoginSuccess
);
