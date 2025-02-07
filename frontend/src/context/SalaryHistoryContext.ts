import { AxiosResponse } from "axios";
import { createContext } from "react";
import { SalaryHistoryState } from "../types/types";

interface SalaryHistoryContextProps extends SalaryHistoryState {
  fetchSalaryHistories: (id: number) => Promise<AxiosResponse | undefined>;
}
export const SalaryHistoryContext = createContext<
  SalaryHistoryContextProps | undefined
>(undefined);
