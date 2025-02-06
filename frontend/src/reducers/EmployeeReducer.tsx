import { EmployeeAction, EmployeeState } from "../types/types";

export const EmployeeReducer = (
  state: EmployeeState,
  action: EmployeeAction
): EmployeeState => {
  switch (action.type) {
    case "FETCH_EMPLOYEES":
      return {
        ...state,
        loading: false,
        employees: action.payload,
        error: null,
      };
    case "CREATE_EMPLOYEE":
      return {
        ...state,
        loading: false,
        employees: [...state.employees, action.payload],
        error: null,
      };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        loading: false,
        error: null,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        ),
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        loading: false,
        error: null,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
