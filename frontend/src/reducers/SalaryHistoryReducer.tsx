import { SalaryHistoryAction, SalaryHistoryState } from "../types/types";

export const SalaryHistoryReducer = (
  state: SalaryHistoryState,
  action: SalaryHistoryAction
): SalaryHistoryState => {
  switch (action.type) {
    case "FETCH_SALARY_HISTORIES":
      return {
        ...state,
        salaryHistories: action.payload,
        salaryHistory: null,
        loading: false,
        error: null,
      };
    case "CREATE_SALARY_HISTORY":
      return {
        ...state,
        loading: false,
        salaryHistory: null,
        salaryHistories: [...state.salaryHistories, action.payload],
        error: null,
      };
    case "UPDATE_SALARY_HISTORY":
      return {
        ...state,
        loading: false,
        salaryHistory: null,
        salaryHistories: state.salaryHistories.map((salaryHistory) =>
          salaryHistory.id === action.payload.id
            ? action.payload
            : salaryHistory
        ),
        error: null,
      };
    case "DELETE_SALARY_HISTORY":
      return {
        ...state,
        loading: false,
        error: null,
        salaryHistory: null,
        salaryHistories: state.salaryHistories.filter(
          (salaryHistory) => salaryHistory.id !== action.payload
        ),
      };
    case "FETCH_SALARY_HISTORY":
      return {
        ...state,
        error: null,
        loading: false,
        salaryHistory: action.payload,
      };
    default:
      return state;
  }
};
