import { createContext, useState, useCallback, useEffect } from "react";
import type { IAuthContext } from "../type/AuthContext";
import { IUser } from "@/types/auth";
import * as SecureStore from "expo-secure-store";
import { getProfile } from "@/api/auth";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refetchUser = useCallback(async () => {
    console.log("🟡 refetchUser START");

    const token = await SecureStore.getItemAsync("access_token");
    console.log("🟡 token:", token);

    if (!token) {
      console.log("🟡 NO TOKEN → EXIT");
      setUser(null);
      return;
    }

    console.log("🟡 calling getProfile");
    const res = await getProfile();
    console.log("🟡 getProfile RESOLVED", res);

    if (res?.success) {
      setUser(res.data);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        await refetchUser();
      } catch (err) {
        console.log("Init failed");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [refetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
