import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthProvider";

const PrivateRoute2 = () => {
  const { isAuthenticated } = UserAuth();
  return isAuthenticated === false ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute2;
