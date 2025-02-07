import { ReactNode, useReducer } from "react";
import api from "../utils/api";
import { EmployeeContext } from "./EmployeeContext";
import { EmployeeReducer } from "../reducers/EmployeeReducer";
import { Employee, EmployeeState } from "../types/types";

const employeeInitialState: EmployeeState = {
  employees: [],
  employee: null,
  loading: true,
  error: null,
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

  const createEmployee = async (formData: Employee) => {
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

  const updateEmployee = async (formData: Employee) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.put(`/employee/${formData.id}`, formData, config);
      employeeDispatch({ type: "UPDATE_EMPLOYEE", payload: res.data.data });
      return res;
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
    }
  };

  const fetchEmployee = async (id: number) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.get(`/employee/${id}`, config);
      employeeDispatch({ type: "FETCH_EMPLOYEE", payload: res.data.data });
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
        employees: employeeState.employees,
        loading: employeeState.loading,
        error: employeeState.error,
        employee: employeeState.employee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
