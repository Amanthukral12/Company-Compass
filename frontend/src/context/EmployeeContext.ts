import { AxiosResponse } from "axios";
import { createContext } from "react";
import { EmployeeState } from "../types/types";

interface EmployeeContextProps extends EmployeeState {
  fetchAllEmployees: () => Promise<AxiosResponse | undefined>;
}
export const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);
