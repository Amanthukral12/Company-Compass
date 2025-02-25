import { AxiosResponse } from "axios";
import { createContext } from "react";
import { EmployeeState } from "../types/types";

interface EmployeeContextProps extends EmployeeState {
  fetchAllEmployees: () => Promise<AxiosResponse | undefined>;
  createEmployee: (formData: {
    name: string;
    phoneNumber: string;
    joinDate: Date;
  }) => Promise<AxiosResponse | undefined>;
  updateEmployee: (
    formData: {
      name: string;
      phoneNumber: string;
      joinDate: Date;
    },
    employeeId: number
  ) => Promise<AxiosResponse | undefined>;
  deleteEmployee: (id: number) => Promise<AxiosResponse | undefined>;
  fetchEmployee: (
    id: number,
    currentYear: number
  ) => Promise<AxiosResponse | undefined>;
  fetchAllEmployeesWithAttendanceSummary: () => Promise<
    AxiosResponse | undefined
  >;
}
export const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);
