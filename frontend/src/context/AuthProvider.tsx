import { ReactNode, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/AuthReducer";
import { AuthState } from "../types/types";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";

const initialState: AuthState = {
  company: null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  loading: true,
  error: null,
  session: null,
  sessions: null,
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  const login = async () => {
    try {
      authDispatch({ type: "LOGIN_START" });
      window.location.href = "http://localhost:8000/auth/google";
      authDispatch({ type: "LOGIN_SUCCESS" });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      authDispatch({ type: "LOGOUT" });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSessions = async () => {
    try {
      const res = await api.get("/auth/allSessions");
      authDispatch({ type: "LOAD_ALL_SESSIONS", payload: res.data.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompanyData = async () => {
    try {
      const res = await api.get("/auth/session");
      authDispatch({ type: "LOAD_SESSION", payload: res.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompanyData = async (formData: {
    name: string;
    GST: string;
    Address: string;
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.put("/auth/profile", formData, config);
      authDispatch({ type: "UPDATE_PROFILE", payload: res.data.data });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompanyData();
  }, [authState.isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{
        company: authState.company,
        isAuthenticated: authState.isAuthenticated,
        loading: authState.loading,
        error: authState.error,
        session: authState.session,
        sessions: authState.sessions,
        login,
        logout,
        fetchCompanyData,
        getAllSessions,
        updateCompanyData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
