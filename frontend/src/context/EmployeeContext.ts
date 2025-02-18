import { AxiosResponse } from "axios";
import { createContext } from "react";
import { Employee, EmployeeState } from "../types/types";

interface EmployeeContextProps extends EmployeeState {
  fetchAllEmployees: () => Promise<AxiosResponse | undefined>;
  createEmployee: (formData: Employee) => Promise<AxiosResponse | undefined>;
  updateEmployee: (FormData: Employee) => Promise<AxiosResponse | undefined>;
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
