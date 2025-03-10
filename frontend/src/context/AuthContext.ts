import { createContext } from "react";
import { AuthState } from "../types/types";
import { AxiosResponse } from "axios";

interface AuthContextProps extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<AxiosResponse | undefined>;
  fetchCompanyData: () => Promise<AxiosResponse | undefined>;
  getAllSessions: () => Promise<AxiosResponse | undefined>;
  updateCompanyData: (formData: {
    name: string;
    GST: string;
    Address: string;
  }) => Promise<AxiosResponse | undefined>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
