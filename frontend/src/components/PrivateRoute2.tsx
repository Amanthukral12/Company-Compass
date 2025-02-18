import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";

const PrivateRoute2 = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute2;
