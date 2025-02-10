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
}

export const AttendanceContext = createContext<
  AttendanceContextProps | undefined
>(undefined);
