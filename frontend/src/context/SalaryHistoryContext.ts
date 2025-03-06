import { AxiosResponse } from "axios";
import { createContext } from "react";
import { SalaryHistory, SalaryHistoryState } from "../types/types";

interface SalaryHistoryContextProps extends SalaryHistoryState {
  fetchSalaryHistories: (id: number) => Promise<AxiosResponse | undefined>;
  addSalaryHistory: (
    employeeId: number,
    formData: SalaryHistory
  ) => Promise<AxiosResponse | undefined>;
  deleteSalaryHistory: (
    employeeId: number,
    salaryHistoryId: number
  ) => Promise<AxiosResponse | undefined>;
  updateSalaryHistory: (
    employeeId: number,
    salaryHistoryId: number,
    formData: { startDate: Date; endDate: Date; hourlyRate: number }
  ) => Promise<AxiosResponse | undefined>;
  fetchSalaryHistory: (
    employeeId: number,
    salaryHistoryId: number
  ) => Promise<AxiosResponse | undefined>;
}
export const SalaryHistoryContext = createContext<
  SalaryHistoryContextProps | undefined
>(undefined);
