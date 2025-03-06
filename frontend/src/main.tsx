import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Home from "./pages/Home.tsx";
import PrivateRoute2 from "./components/PrivateRoute2.tsx";
import Profile from "./pages/Profile.tsx";
import EmployeeProvider from "./context/EmployeeProvider.tsx";
import SalaryHistoryProvider from "./context/SalaryHistoryProvider.tsx";
import AttendanceProvider from "./context/AttendanceProvider.tsx";
import Employees from "./pages/Employees.tsx";
import EmployeeDetails from "./pages/EmployeeDetails.tsx";
import AttendanceDetail from "./pages/AttendanceDetail.tsx";
import AddEmployee from "./pages/AddEmployee.tsx";
import UpdateEmployee from "./pages/UpdateEmployee.tsx";
import SalaryHistory from "./pages/SalaryHistory.tsx";
import UpdateSalaryHistory from "./pages/UpdateSalaryHistory.tsx";
import AddSalaryHistory from "./pages/AddSalaryHistory.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoute2 />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route index={true} element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/companyemployees" element={<Employees />} />
        <Route path="/companyemployee/add" element={<AddEmployee />} />
        <Route
          path="/currentemployee/:employeeId"
          element={<EmployeeDetails />}
        />
        <Route
          path="/currentemployee/update/:employeeId"
          element={<UpdateEmployee />}
        />
        <Route
          path="/currentemployee/:employeeId/salaryHistory"
          element={<SalaryHistory />}
        />
        <Route
          path="/currentemployee/:employeeId/salaryHistory/add"
          element={<AddSalaryHistory />}
        />
        <Route
          path="/currentemployee/:employeeId/salaryHistory/update/:salaryHistoryId"
          element={<UpdateSalaryHistory />}
        />
        <Route
          path="/:employeeId/attendanceDetail/:year/:monthnumber"
          element={<AttendanceDetail />}
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <EmployeeProvider>
        <SalaryHistoryProvider>
          <AttendanceProvider>
            <RouterProvider router={router} />
          </AttendanceProvider>
        </SalaryHistoryProvider>
      </EmployeeProvider>
    </AuthProvider>
  </StrictMode>
);
