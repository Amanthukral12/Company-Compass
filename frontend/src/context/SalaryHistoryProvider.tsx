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
        payload: res.data.data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const addSalaryHistory = async (
    employeeId: number,
    formData: { startDate: Date; endDate: Date | undefined; hourlyRate: number }
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.post(
        `/employee/${employeeId}/salaryHistory/add`,
        formData,
        config
      );
      salaryHistoryDispatch({
        type: "CREATE_SALARY_HISTORY",
        payload: res.data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSalaryHistory = async (
    employeeId: number,
    salaryHistoryId: number
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.delete(
        `/employee/${employeeId}/salaryHistory/${salaryHistoryId}`,
        config
      );
      salaryHistoryDispatch({
        type: "DELETE_SALARY_HISTORY",
        payload: salaryHistoryId,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const updateSalaryHistory = async (
    employeeId: number,
    salaryHistoryId: number,
    formData: { startDate: Date; endDate: Date; hourlyRate: number }
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await api.put(
      `/employee/${employeeId}/salaryHistory/${salaryHistoryId}`,
      formData,
      config
    );
    salaryHistoryDispatch({
      type: "UPDATE_SALARY_HISTORY",
      payload: res.data,
    });
    return res;
  };

  const fetchSalaryHistory = async (
    employeeId: number,
    salaryHistoryId: number
  ) => {
    try {
      const res = await api.get(
        `/employee/${employeeId}/salaryHistory/${salaryHistoryId}`
      );
      salaryHistoryDispatch({
        type: "FETCH_SALARY_HISTORY",
        payload: res.data.data,
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
        addSalaryHistory,
        deleteSalaryHistory,
        updateSalaryHistory,
        fetchSalaryHistory,
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
