import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import prisma from "../db/db";
import { ApiResponse } from "../utils/ApiResponse";

export const getMonthlyAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }

    const employeeId = Number(req.params.employeeId);
    const year = Number(req.params.year);
    const month = Number(req.params.month);

    const companyId = req.company.id;

    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
        companyId,
      },
    });

    if (!employee) {
      throw new ApiError(404, "Employee not found", ["Employee not found"]);
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendance = await prisma.attendance.findMany({
      where: {
        employeeId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        hours: true,
        status: true,
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          attendance,
          "Monthly attendance fetched successfully"
        )
      );
  }
);

export const addAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }

    const companyId = req.company.id;
    const employeeId = Number(req.params.employeeId);

    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
        companyId,
      },
    });

    if (!employee) {
      throw new ApiError(404, "Employee not found", ["Employee not found"]);
    }

    const { date, startTime, endTime, hours, status } = req.body;

    if (!date || !startTime || !endTime || !hours || !status) {
      throw new ApiError(400, "Please provide all details", [
        "Please provide all details",
      ]);
    }

    const attendance = await prisma.attendance.create({
      data: {
        date,
        startTime,
        endTime,
        hours,
        status,
        employeeId,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, attendance, "Attendance added."));
  }
);

export const deleteAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const employeeId = Number(req.params.employeeId);
    const attendanceId = Number(req.params.attendanceId);

    const attendance = await prisma.attendance.findUnique({
      where: {
        id: attendanceId,
        employeeId,
      },
    });

    if (!attendance) {
      throw new ApiError(404, "No attendance found. Please try again.", [
        "No attendance found. Please try again.",
      ]);
    }

    await prisma.attendance.delete({
      where: {
        id: attendanceId,
        employeeId,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Attendance deleted successfully"));
  }
);

export const updateAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const employeeId = Number(req.params.employeeId);
    const attendanceId = Number(req.params.attendanceId);
    const { date, startTime, endTime, hours, status } = req.body;
    const attendance = await prisma.attendance.findUnique({
      where: {
        id: attendanceId,
        employeeId,
      },
    });

    if (!attendance) {
      throw new ApiError(404, "No attendance found. Please try again.", [
        "No attendance found. Please try again.",
      ]);
    }

    const updatedAttendance = await prisma.attendance.update({
      where: {
        id: attendanceId,
        employeeId,
      },
      data: {
        date: date ? date : undefined,
        startTime: startTime ? startTime : undefined,
        endTime: endTime ? endTime : undefined,
        hours: hours !== undefined ? hours : undefined,
        status: status ? status : undefined,
      },
    });

    if (!updatedAttendance) {
      throw new ApiError(
        404,
        "Failed to update the attendance. Please try again.",
        ["Failed to update the attendance. Please try again."]
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedAttendance,
          "Attendance updated successfully"
        )
      );
  }
);
