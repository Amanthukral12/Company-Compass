import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { authReducer } from "../reducers/AuthReducer";
import { AuthState } from "../types/types";
import { AxiosResponse } from "axios";
import api from "../utils/api";

interface AuthContextProps extends AuthState {
  login: () => Promise<void>;
  fetchCompanyData: () => Promise<AxiosResponse | undefined>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

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

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthProvider");
  }
  return context;
};
