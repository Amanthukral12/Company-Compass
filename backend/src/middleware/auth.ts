import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { verifyAccessToken } from "../utils/auth";
import prisma from "../db/db";
import { CompanyDocument } from "../types/types";

export const authenticateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken =
      req.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      return next(
        new ApiError(401, "Unauthorized. Please try again", [
          "Unauthorized. Please try again",
        ])
      );
    }

    const decoded = verifyAccessToken(accessToken);

    if (!decoded) {
      return next(new ApiError(401, "Invalid token", ["Invalid token"]));
    }
    const session = await prisma.session.findUnique({
      where: {
        sessionId: decoded.sessionId,
      },
      omit: {
        refreshToken: true,
      },
      include: {
        company: true,
      },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await prisma.session.delete({ where: { id: session.id } });
      }

      throw new ApiError(401, "Invalid or expired session", [
        "Invalid or expired session",
      ]);
    }
    await prisma.session.update({
      where: { id: session.id },
      data: { lastUsedAt: new Date() },
    });
    req.company = session.company as CompanyDocument;
    req.currentSession = session;
    next();
  } catch (error) {
    // If error is already an ApiError, pass it through
    if (error instanceof ApiError) {
      next(error);
    } else {
      // For unexpected errors
      next(
        new ApiError(500, "Internal Server Error", ["Something went wrong"])
      );
    }
  }
};
