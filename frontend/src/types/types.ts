export interface Company {
  id: number;
  name: string;
  googleId: string;
  email: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  sessionId: string;
  companyId: number;
  deviceInfo: string | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  lastUsedAt: Date;
  company: Company;
}

export interface CustomSession {
  data: {
    currentCompany: Company;
    currentSession: Session;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  company: Company | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS" }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOAD_SESSION"; payload: CustomSession }
  | { type: "LOGOUT" };
