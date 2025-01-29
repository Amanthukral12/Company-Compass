import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import prisma from "../db/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const googleLoginSuccess = asyncHandler(
  async (req: any, res: Response) => {
    try {
      const { company } = req.company;
      const deviceInfo = req.deviceInfo;
      const refreshToken = generateRefreshToken({
        sessionId: req.company.sessionId,
      });
      const session = await prisma.session.create({
        data: {
          companyId: company.id,
          refreshToken,
          deviceInfo,
          sessionId: req.company.sessionId,
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
      console.log(error);
      throw new ApiError(401, JSON.stringify(error) || "Error logging in", [
        "Error logging in",
      ]);
    }
  }
);

export const getCurrentSession = asyncHandler(
  async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
      throw new ApiError(
        401,
        JSON.stringify(error) || "Error fetching current session",
        ["Error fetching current session"]
      );
    }
  }
);

export const getCurrentCompany = asyncHandler(
  async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
      throw new ApiError(
        401,
        JSON.stringify(error) || "Error fetching current company",
        ["Error fetching current company"]
      );
    }
  }
);
