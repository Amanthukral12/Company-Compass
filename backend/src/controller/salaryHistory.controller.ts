import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import prisma from "../db/db";
import { ApiResponse } from "../utils/ApiResponse";

export const addSalaryHistory = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const employeeId = Number(req.params.employeeId);
    const hourlyRate = parseFloat(req.body.hourlyRate);

    const { startDate, endDate } = req.body;

    if (!hourlyRate || !startDate) {
      throw new ApiError(400, "Please enter complete information", [
        "Please enter complete information",
      ]);
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(employeeId),
        companyId,
      },
    });
    if (!employee) {
      throw new ApiError(
        401,
        "Employee does not exists. Please try for another employee",
        ["Employee does not exists. Please try for another employee"]
      );
    }

    const salaryHistory = await prisma.salaryHistory.create({
      data: {
        employeeId,
        companyId,
        hourlyRate,
        startDate,
        endDate,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, salaryHistory, "Salary history added"));
  }
);
