import { z } from "zod";
import type { ApiResponse } from "./api";
import { updatePasswordSchema } from "@/lib/validations/auth";
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

export interface IProfileCardProps {
  email: string;
  name: string;
  office: {
    _id: string;
    name: string;
    isActive: boolean;
    workStartTime: string;
    workEndTime: string;
  };
  role: string;
  _id: string;
  uid: string;
  image: string;
}
export type IUserResponse = ApiResponse<IUser>;
export type IUpdatePassword = z.infer<typeof updatePasswordSchema>;
