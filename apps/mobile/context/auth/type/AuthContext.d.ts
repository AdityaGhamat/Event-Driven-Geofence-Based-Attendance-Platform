import { IUser } from "@/types/auth";
import { Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<any>>;
  loading: boolean;
  isAuthenticated: boolean;
  refetchUser: () => Promise<void>;
}
