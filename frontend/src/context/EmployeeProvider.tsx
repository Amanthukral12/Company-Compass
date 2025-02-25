import { ReactNode, useCallback, useReducer } from "react";
import api from "../utils/api";
import { EmployeeContext } from "./EmployeeContext";
import { EmployeeReducer } from "../reducers/EmployeeReducer";
import { EmployeeState } from "../types/types";

const employeeInitialState: EmployeeState = {
  employees: [],
  employee: null,
  loading: true,
  error: null,
  employeesWithAttendance: [],
};

const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employeeState, employeeDispatch] = useReducer(
    EmployeeReducer,
    employeeInitialState
  );
  const fetchAllEmployees = async () => {
    try {
      const res = await api.get("/employee/");
      employeeDispatch({ type: "FETCH_EMPLOYEES", payload: res.data.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const createEmployee = async (formData: {
    name: string;
    phoneNumber: string;
    joinDate: Date;
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.post("/employee/add", formData, config);
      employeeDispatch({ type: "CREATE_EMPLOYEE", payload: res.data.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployee = async (
    formData: {
      name: string;
      phoneNumber: string;
      joinDate: Date;
    },
    employeeId: number
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.put(`/employee/${employeeId}`, formData, config);
      employeeDispatch({ type: "UPDATE_EMPLOYEE", payload: res.data.data });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (id: number) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.delete(`/employee/${id}`, config);
      employeeDispatch({ type: "DELETE_EMPLOYEE", payload: id });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchEmployee = useCallback(async (id: number, currentYear: number) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.get(
        `/employee/${id}?currentYear=${currentYear}`,
        config
      );
      employeeDispatch({ type: "FETCH_EMPLOYEE", payload: res.data.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchAllEmployeesWithAttendanceSummary = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.get(
        "/employee/employees-attendance-overview",
        config
      );
      employeeDispatch({
        type: "FETCH_ALL_EMPLOYEES_WITH_ATTENDANCE_SUMMARY",
        payload: res.data.data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <EmployeeContext.Provider
      value={{
        fetchAllEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        fetchEmployee,
        fetchAllEmployeesWithAttendanceSummary,
        employees: employeeState.employees,
        loading: employeeState.loading,
        error: employeeState.error,
        employee: employeeState.employee,
        employeesWithAttendance: employeeState.employeesWithAttendance,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
