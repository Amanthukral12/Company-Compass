import { ReactNode, useReducer } from "react";
import { SalaryHistoryContext } from "./SalaryHistoryContext";
import { SalaryHistoryState } from "../types/types";
import { SalaryHistoryReducer } from "../reducers/SalaryHistoryReducer";
import api from "../utils/api";

const salaryHistoryInitialState: SalaryHistoryState = {
  salaryHistories: [],
  salaryHistory: null,
  loading: true,
  error: null,
};

const SalaryHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [salaryHistoryState, salaryHistoryDispatch] = useReducer(
    SalaryHistoryReducer,
    salaryHistoryInitialState
  );
  const fetchSalaryHistories = async (employeeId: number) => {
    try {
      const res = await api.get(`/employee/${employeeId}/salaryHistory`);
      salaryHistoryDispatch({
        type: "FETCH_SALARY_HISTORIES",
        payload: res.data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SalaryHistoryContext.Provider
      value={{
        fetchSalaryHistories,
        salaryHistories: salaryHistoryState.salaryHistories,
        salaryHistory: salaryHistoryState.salaryHistory,
        loading: salaryHistoryState.loading,
        error: salaryHistoryState.error,
      }}
    >
      {children}
    </SalaryHistoryContext.Provider>
  );
};

export default SalaryHistoryProvider;
