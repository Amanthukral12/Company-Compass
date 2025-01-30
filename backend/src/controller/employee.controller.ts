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
    });
    return res
      .status(200)
      .json(new ApiResponse(200, employees, "Employees fetched"));
  }
);

export const getEmployeeById = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.company) {
      throw new ApiError(401, "Unauthorized Access. Please login again", [
        "Unauthorized Access. Please login again",
      ]);
    }
    const companyId = req.company.id;
    const { employeeId } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id: Number(employeeId), companyId },
    });

    if (!employee) {
      throw new ApiError(404, "Employee not found", ["Employee not found"]);
    }

    return res
      .status(200)
      .json(new ApiResponse(200, employee, "Employee fetched successfully"));
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

    const employee = prisma.employee.findUnique({
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
        companyId,
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
    const { name, phoneNumber } = req.body;

    const employeeExists = prisma.employee.findUnique({
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
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, employee, "Employee updated successfully"));
  }
);
