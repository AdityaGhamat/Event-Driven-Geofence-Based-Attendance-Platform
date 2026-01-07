import type { ApiResponse } from "../../../types";
import { z } from "zod";
import type { updatePasswordSchema } from "../validations";
export type AuthContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  isAuthenticated: boolean;
  refetchUser: () => Promise<void>;
};
export interface IUser {
  email: string;
  name: string;
  office: {
    _id: string;
    name: string;
    isActive: boolean;
    workStartTime: string;
    workEndTime: string;
    coordinates: number[];
    workingDays: number[];
    geofence_radius: number;
  };
  role: string;
  _id: string;
  uid: string;
  image: string;
}

export type IUserResponse = ApiResponse<IUser>;
export type IUpdatePassword = z.infer<typeof updatePasswordSchema>;
