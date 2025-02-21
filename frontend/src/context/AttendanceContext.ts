import { createContext } from "react";
import { Attendance, AttendanceState } from "../types/types";
import { AxiosResponse } from "axios";

interface AttendanceContextProps extends AttendanceState {
  addAttendance: (
    employeeId: number,
    formData: Attendance
  ) => Promise<AxiosResponse | undefined>;
  deleteAttendance: (
    employeeId: number,
    attendanceId: number
  ) => Promise<AxiosResponse | undefined>;
  updateAttendance: (
    employeeId: number,
    attendanceId: number,
    formData: Attendance
  ) => Promise<AxiosResponse | undefined>;
  fetchMonthlyAttendance: (
    employeeId: number,
    year: number,
    monthnumber: number
  ) => Promise<AxiosResponse | undefined>;
}

export const AttendanceContext = createContext<
  AttendanceContextProps | undefined
>(undefined);
