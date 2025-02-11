import { ReactNode, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/AuthReducer";
import { AuthState } from "../types/types";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";

const initialState: AuthState = {
  company: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  session: null,
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  const login = async () => {
    authDispatch({ type: "LOGIN_START" });
    window.location.href = "http://localhost:8000/auth/google";
    authDispatch({ type: "LOGIN_SUCCESS" });
  };

  useEffect(() => {
    fetchCompanyData();
  }, [authState.isAuthenticated]);

  const fetchCompanyData = async () => {
    try {
      const res = await api.get("/auth/session");
      authDispatch({ type: "LOAD_SESSION", payload: res.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        company: authState.company,
        isAuthenticated: authState.isAuthenticated,
        loading: authState.loading,
        error: authState.error,
        session: authState.session,
        login,
        fetchCompanyData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
