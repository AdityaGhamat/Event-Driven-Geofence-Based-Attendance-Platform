import type React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { Navigate } from "react-router";
import Loading from "../../../components/Loading";

const OfficeProtection = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  if (user?.office) {
    return <Navigate to={"/dashboard/office"} replace />;
  } else {
    return <>{children}</>;
  }
};

export default OfficeProtection;
