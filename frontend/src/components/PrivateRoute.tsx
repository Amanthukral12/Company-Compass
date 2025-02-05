import { Outlet, Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthProvider";

const PrivateRoute = () => {
  const { isAuthenticated } = UserAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
