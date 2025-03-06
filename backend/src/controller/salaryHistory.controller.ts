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

export const getAllSalaryHistoryForEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const employeeId = Number(req.params.employeeId);

    const salaryHistories = await prisma.salaryHistory.findMany({
      where: {
        employeeId,
        companyId,
      },
      orderBy: {
        startDate: "desc",
      },
    });
    if (!salaryHistories) {
      throw new ApiError(404, "No salary histories found", [
        "No salary histories found",
      ]);
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          salaryHistories,
          "Salary histories fetched successfully"
        )
      );
  }
);

export const deleteSalaryHistory = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const employeeId = Number(req.params.employeeId);
    const salaryHistoryId = Number(req.params.salaryHistoryId);

    const salaryHistory = await prisma.salaryHistory.findUnique({
      where: {
        id: salaryHistoryId,
      },
    });
    if (!salaryHistory) {
      throw new ApiError(404, "No salary history found", [
        "No salary history found",
      ]);
    }

    await prisma.salaryHistory.delete({
      where: {
        id: salaryHistory.id,
        companyId,
        employeeId,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, {}, "Salary History delete successfully"));
  }
);

export const updateSalaryHistory = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const employeeId = Number(req.params.employeeId);
    const salaryHistoryId = Number(req.params.salaryHistoryId);

    const { startDate, endDate } = req.body;

    const hourlyRate = parseFloat(req.body.hourlyRate);

    const salaryHistory = await prisma.salaryHistory.findUnique({
      where: {
        id: salaryHistoryId,
        companyId,
        employeeId,
      },
    });
    if (!salaryHistory) {
      throw new ApiError(404, "No salary history found", [
        "No salary history found",
      ]);
    }

    const updatedSalaryHistory = await prisma.salaryHistory.update({
      where: {
        id: salaryHistoryId,
        companyId,
        employeeId,
      },
      data: {
        hourlyRate: hourlyRate ? hourlyRate : undefined,
        startDate: startDate ? startDate : undefined,
        endDate: endDate ? endDate : undefined,
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedSalaryHistory, "Salary History updated")
      );
  }
);
