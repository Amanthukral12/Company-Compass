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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoute2 />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/companyemployees" element={<Employees />} />
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
