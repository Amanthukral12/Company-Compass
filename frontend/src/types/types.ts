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
  sessions: Session[] | null;
  loading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS" }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOAD_SESSION"; payload: CustomSession }
  | { type: "LOAD_ALL_SESSIONS"; payload: Session[] }
  | { type: "LOGOUT" };

export interface Employee {
  id: number;
  name: string;
  phoneNumber: string;
  companyId: number;
  status: string;
  joinDate: Date;
  createdAt: Date;
  updatedAt: Date;
  company: Company;
  salaryHistory: SalaryHistory[];
}

export interface SalaryHistory {
  id: number;
  employeeId: number;
  companyId: number;
  hourlyRate: number;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  employee: Employee;
}
enum AttendanceStatus {
  PRESENT,
  ABSENT,
  HALF_DAY,
  LEAVE,
}

export interface Attendance {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  hours: number;
  employeeId: number;
  createdAt: Date;
  updatedAt: Date;
  employee: Employee;
  status: AttendanceStatus;
}

export interface SalaryHistoryState {
  salaryHistories: SalaryHistory[] | [];
  salaryHistory: SalaryHistory | null;
  loading: boolean;
  error: string | null;
}

export interface EmployeeState {
  employees: Employee[] | [];
  employee: EmployeeOverview | null;
  employeesWithAttendance: EmployeesWithAttendance[] | [];
  loading: boolean;
  error: string | null;
}

export interface AttendanceState {
  loading: boolean;
  error: string | null;
  attendances: Attendance[] | [];
  attendance: Attendance | null;
}

export interface AttendanceOverview {
  monthName: string;
  monthNumber: number;
  totalDays: number;
  totalHours: number;
  presentDays: number;
  absentDays: number;
  halfDays: number;
  leaveDays: number;
}

export interface EmployeeOverview {
  employee: Employee;
  currentMonth: AttendanceOverview;
  otherMonths: AttendanceOverview[];
}

export interface EmployeesWithAttendance {
  id: number;
  name: string;
  phoneNumber: string;
  totalHoursWorked: number;
  totalDaysAttended: number;
  totalAbsentDays: number;
}

export type EmployeeAction =
  | { type: "FETCH_EMPLOYEES"; payload: Employee[] }
  | { type: "CREATE_EMPLOYEE"; payload: Employee }
  | { type: "UPDATE_EMPLOYEE"; payload: Employee }
  | { type: "DELETE_EMPLOYEE"; payload: number }
  | { type: "FETCH_EMPLOYEE"; payload: EmployeeOverview }
  | {
      type: "FETCH_ALL_EMPLOYEES_WITH_ATTENDANCE_SUMMARY";
      payload: EmployeesWithAttendance[];
    };

export type SalaryHistoryAction =
  | {
      type: "FETCH_SALARY_HISTORIES";
      payload: SalaryHistory[];
    }
  | { type: "CREATE_SALARY_HISTORY"; payload: SalaryHistory }
  | { type: "UPDATE_SALARY_HISTORY"; payload: SalaryHistory }
  | { type: "DELETE_SALARY_HISTORY"; payload: number }
  | { type: "FETCH_SALARY_HISTORY"; payload: SalaryHistory };

export type AttendanceAction =
  | { type: "ADD_ATTENDANCE"; payload: Attendance }
  | { type: "DELETE_ATTENDANCE"; payload: number }
  | { type: "UPDATE_ATTENDANCE"; payload: Attendance }
  | { type: "FETCH_MONTHLY_ATTENDANCE"; payload: Attendance[] };
