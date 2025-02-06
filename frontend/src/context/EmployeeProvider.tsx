import { ReactNode, useReducer } from "react";
import api from "../utils/api";
import { EmployeeContext } from "./EmployeeContext";
import { EmployeeReducer } from "../reducers/EmployeeReducer";
import { EmployeeState } from "../types/types";

const employeeInitialState: EmployeeState = {
  employees: [],
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
      console.log(res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <EmployeeContext.Provider
      value={{
        fetchAllEmployees,
        employees: employeeState.employees,
        loading: employeeState.loading,
        error: employeeState.error,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
