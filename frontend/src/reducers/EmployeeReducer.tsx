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

    default:
      return state;
  }
};
