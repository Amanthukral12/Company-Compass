import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import prisma from "../db/db";
import { ApiResponse } from "../utils/ApiResponse";

export const createEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
      throw new ApiError(400, "Please provide all details", [
        "Please provide all details",
      ]);
    }
    try {
      const employee = await prisma.employee.create({
        data: {
          name,
          phoneNumber,
          companyId,
        },
      });
      return res
        .status(201)
        .json(new ApiResponse(201, employee, "Employee Added"));
    } catch (error) {
      console.log(error);
      throw new ApiError(400, "Error adding employee", [
        "Error adding employee",
      ]);
    }
  }
);
