import { AuthContext } from "@/context/auth/context/AuthContext";
import { IAuthContext } from "@/context/auth/type/AuthContext";
import { useContext } from "react";

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
