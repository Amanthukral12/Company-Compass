import { createContext } from "react";
import { Attendance, AttendanceState } from "../types/types";
import { AxiosResponse } from "axios";

interface AttendanceContextProps extends AttendanceState {
  addAttendance: ({
    employeeId,
    formData,
  }: {
    employeeId: number;
    formData: Attendance;
  }) => Promise<AxiosResponse | undefined>;
  deleteAttendance: ({
    employeeId,
    attendanceId,
  }: {
    employeeId: number;
    attendanceId: number;
  }) => Promise<AxiosResponse | undefined>;
  updateAttendance: ({
    employeeId,
    attendanceId,
    formData,
  }: {
    employeeId: number;
    attendanceId: number;
    formData: Attendance;
  }) => Promise<AxiosResponse | undefined>;
  fetchMonthlyAttendance: ({
    employeeId,
    year,
    month,
  }: {
    employeeId: number;
    year: number;
    month: number;
  }) => Promise<AxiosResponse | undefined>;
}

export const AttendanceContext = createContext<
  AttendanceContextProps | undefined
>(undefined);
