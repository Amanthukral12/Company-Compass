import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/auth";
import prisma from "../db/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const googleLoginSuccess = asyncHandler(
  async (req: any, res: Response) => {
    try {
      const { company } = req.user;
      const deviceInfo = req.deviceInfo;
      const refreshToken = generateRefreshToken({
        sessionId: req.user.sessionId,
      });
      const session = await prisma.session.create({
        data: {
          companyId: company.id,
          refreshToken,
          deviceInfo,
          sessionId: req.user.sessionId,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
      const accessToken = generateAccessToken({
        companyId: company.id,
        sessionId: session.sessionId,
      });
      return res
        .status(200)
        .cookie("access_token", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .redirect(process.env.FRONTEND_URL!);
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(401, error.message || "Error logging in", [
          "Error logging in",
        ]);
      }
    }
  }
);

export const getCurrentSession = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const currentSession = req.currentSession;
    const currentCompany = req.company;
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { currentCompany, currentSession },
          "Fetched current session successfully"
        )
      );
  }
);

export const getCurrentCompany = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }

    const currentCompany = req.company;

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          currentCompany,
          "Fetch current company successfully"
        )
      );
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  if (!req.currentSession) {
    throw new ApiError(401, "No active session", ["No active session"]);
  }

  await prisma.session.delete({
    where: { id: req.currentSession.id },
  });
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("access_token", options)
    .clearCookie("refresh_token", options)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const incomingRefreshToken =
      req.cookies?.refresh_token || req.body.refresh_token;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request", [
        "No refresh token provided",
      ]);
    }
    try {
      const decodedToken = verifyRefreshToken(incomingRefreshToken);

      const session = await prisma.session.findUnique({
        where: { sessionId: decodedToken?.sessionId },
        include: { company: true },
      });
      const options = {
        htpOnly: true,
        secure: true,
      };
      if (!session) {
        res
          .status(401)
          .clearCookie("access_token", options)
          .clearCookie("refresh_token", options);
        throw new ApiError(401, "Invalid session", ["Invalid session"]);
      }
      if (session.expiresAt < new Date()) {
        await prisma.session.delete({
          where: { id: session.id },
        });
        res
          .status(401)
          .clearCookie("access_token", options)
          .clearCookie("refresh_token", options);
        throw new ApiError(401, "Session Expired", ["Session Expired"]);
      }

      const accessToken = generateAccessToken({
        companyId: session.companyId,
        sessionId: session.sessionId,
      });

      await prisma.session.update({
        where: { id: session.id },
        data: { lastUsedAt: new Date() },
      });

      res
        .status(200)
        .cookie("access_token", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 15 * 60 * 1000,
        })
        .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
    } catch (error) {
      console.log(error);
      const options = {
        httpOnly: true,
        secure: true,
      };
      res.clearCookie("access_token", options);
      res.clearCookie("refresh_token", options);
      throw new ApiError(401, "Invalid refresh token", [
        "Invalid refresh token",
      ]);
    }
  }
);
