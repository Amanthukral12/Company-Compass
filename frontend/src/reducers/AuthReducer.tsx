import { AuthAction, AuthState } from "../types/types";

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("isAuthenticated", "true");
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOAD_SESSION":
      localStorage.setItem(
        "sessionInfo",
        JSON.stringify(action.payload.data.currentSession)
      );
      localStorage.setItem(
        "companyInfo",
        JSON.stringify(action.payload.data.currentCompany)
      );
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        company: action.payload.data.currentCompany,
        session: action.payload.data.currentSession,
      };
    case "LOAD_ALL_SESSIONS":
      return {
        ...state,
        loading: false,
        sessions: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        company: null,
        session: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
