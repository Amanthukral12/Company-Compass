import { createContext } from "react";
import { AuthState } from "../types/types";
import { AxiosResponse } from "axios";

interface AuthContextProps extends AuthState {
  login: () => Promise<void>;
  fetchCompanyData: () => Promise<AxiosResponse | undefined>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
