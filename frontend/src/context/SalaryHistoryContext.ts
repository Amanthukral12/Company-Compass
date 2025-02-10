import { AxiosResponse } from "axios";
import { createContext } from "react";
import { SalaryHistory, SalaryHistoryState } from "../types/types";

interface SalaryHistoryContextProps extends SalaryHistoryState {
  fetchSalaryHistories: (id: number) => Promise<AxiosResponse | undefined>;
  addSalaryHistory: ({
    employeeId,
    formData,
  }: {
    employeeId: number;
    formData: SalaryHistory;
  }) => Promise<AxiosResponse | undefined>;
  deleteSalaryHistory: ({
    employeeId,
    salaryHistoryId,
  }: {
    employeeId: number;
    salaryHistoryId: number;
  }) => Promise<AxiosResponse | undefined>;
  updateSalaryHistory: ({
    employeeId,
    salaryHistoryId,
    formData,
  }: {
    employeeId: number;
    salaryHistoryId: number;
    formData: SalaryHistory;
  }) => Promise<AxiosResponse | undefined>;
}
export const SalaryHistoryContext = createContext<
  SalaryHistoryContextProps | undefined
>(undefined);
