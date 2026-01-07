import type React from "react";
import { useAuth } from "../modules/auth/hooks/useAuth";
import { Navigate } from "react-router";
import Loading from "./Loading";
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
