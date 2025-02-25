import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import prisma from "../db/db";
import { ApiResponse } from "../utils/ApiResponse";
import { startOfMonth, endOfMonth } from "date-fns";
export const createEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const { name, phoneNumber, joinDate } = req.body;

    if (!name || !phoneNumber || !joinDate) {
      throw new ApiError(400, "Please provide all details", [
        "Please provide all details",
      ]);
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        phoneNumber,
        joinDate,
        companyId,
      },
    });
    return res
      .status(201)
      .json(new ApiResponse(201, employee, "Employee Added"));
  }
);

export const getAllEmployees = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const employees = await prisma.employee.findMany({
      where: {
        companyId,
      },
      include: {
        salaryHistory: {
          where: { endDate: null },
          orderBy: { startDate: "desc" },
          take: 1,
          select: {
            hourlyRate: true,
          },
        },
      },
    });
    const formattedEmployees = employees.map((employee) => ({
      ...employee,
      salaryHistory: employee.salaryHistory || [],
    }));
    return res
      .status(200)
      .json(new ApiResponse(200, formattedEmployees, "Employees fetched"));
  }
);

export const getEmployeeOverView = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const { employeeId } = req.params;
    const currentDate = new Date();
    const currentYear = Number(req.query.currentYear);
    const currentMonth = currentDate.getMonth() + 1;
    const employee = await prisma.employee.findUnique({
      where: { id: Number(employeeId), companyId },
      include: {
        salaryHistory: {
          where: { endDate: null },
          orderBy: { startDate: "desc" },
          take: 1,
          select: {
            hourlyRate: true,
          },
        },
      },
    });

    if (!employee) {
      throw new ApiError(404, "Employee not found", ["Employee not found"]);
    }

    const allMonthlySummaries = await prisma.$queryRaw`
    SELECT 
        to_char(DATE_TRUNC('month', date), 'FMMonth') AS monthName, -- 'FM' removes extra spaces
        EXTRACT(MONTH FROM date) AS monthNumber,
        COUNT(*) AS totalDays,
        SUM(hours) AS totalHours,
        COUNT(CASE WHEN status='PRESENT' THEN 1 END) AS presentDays,
        COUNT(CASE WHEN status='ABSENT' THEN 1 END) AS absentDays,
        COUNT(CASE WHEN status='HALF_DAY' THEN 1 END) AS halfDays,
        COUNT(CASE WHEN status='LEAVE' THEN 1 END) AS leaveDays
    FROM "Attendance"
    WHERE
        "employeeId" = ${Number(employeeId)}
        AND EXTRACT(YEAR FROM date) = ${currentYear}
    GROUP BY DATE_TRUNC('month', date), EXTRACT(MONTH FROM date)
    ORDER BY DATE_TRUNC('month', date) ASC;
`;

    const formattedSummaries = (allMonthlySummaries as any).map(
      (summary: any) => ({
        ...summary,
        totaldays: Number(summary.totaldays),
        totalhours: Number(summary.totalhours),
        presentdays: Number(summary.presentdays),
        absentdays: Number(summary.absentdays),
        halfdays: Number(summary.halfdays),
        leavedays: Number(summary.leavedays),
      })
    );

    const currentMonthSummary = (formattedSummaries as any).find(
      (summary: any) => Number(summary.monthnumber) === currentMonth
    ) || {
      monthname: new Date(currentYear, currentMonth - 1).toLocaleString(
        "default",
        { month: "long" }
      ),
      monthnumber: currentMonth,
      totaldays: 0,
      totalhours: 0,
      presentdays: 0,
      absentdays: 0,
      halfdays: 0,
      leavedays: 0,
    };

    const otherMonths = (formattedSummaries as any).filter(
      (summary: any) => Number(summary.monthnumber) !== currentMonth
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { employee, currentMonth: currentMonthSummary, otherMonths },
          "Employee details fetched successfully"
        )
      );
  }
);

export const deleteEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const { employeeId } = req.params;

    const employee = await prisma.employee.findFirst({
      where: {
        id: Number(employeeId),
        companyId,
      },
    });

    if (!employee) {
      throw new ApiError(404, "Employee not found", ["Employee not found"]);
    }

    await prisma.employee.delete({
      where: {
        id: Number(employeeId),
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Employee deleted successfully"));
  }
);

export const updateEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const { employeeId } = req.params;
    const { name, phoneNumber, joinDate } = req.body;

    const employeeExists = await prisma.employee.findUnique({
      where: {
        id: Number(employeeId),
        companyId,
      },
    });

    if (!employeeExists) {
      throw new ApiError(404, "Employee not found", ["Employee not found"]);
    }

    const employee = await prisma.employee.update({
      where: {
        companyId,
        id: Number(employeeId),
      },
      data: {
        name: name !== undefined ? name : undefined,
        phoneNumber: phoneNumber !== undefined ? phoneNumber : undefined,
        joinDate: joinDate !== undefined ? joinDate : undefined,
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, employee, "Employee updated successfully"));
  }
);

export const getAllEmployeesWithAttendanceSummary = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());

    const employees = await prisma.employee.findMany({
      where: { companyId },
      include: {
        attendance: {
          where: {
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
          select: {
            hours: true,
            date: true,
            status: true,
          },
        },
      },
    });
    const employeesSummary = employees.map((employee) => {
      const totalHoursWorked = employee.attendance.reduce(
        (sum, record) => sum + record.hours,
        0
      );
      const totalAbsentDays = employee.attendance.filter(
        (record) => record.status === "ABSENT"
      ).length;
      const totalDaysAttended = new Set(
        employee.attendance.map(
          (record) => record.date.toISOString().split("T")[0]
        )
      ).size;
      return {
        id: employee.id,
        name: employee.name,
        phoneNumber: employee.phoneNumber,
        totalHoursWorked,
        totalDaysAttended,
        totalAbsentDays,
      };
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          employeesSummary,
          "Employees with Attendance summary fetched successfully"
        )
      );
  }
);
