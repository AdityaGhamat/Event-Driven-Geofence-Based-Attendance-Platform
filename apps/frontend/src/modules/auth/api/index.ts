import { api } from "../../../api";
import type { ApiResponse } from "../../../types";
import type { IUpdatePassword, IUserResponse } from "../type";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/api/auth/create-new-user", {
    name,
    email,
    password,
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/api/auth/sign-in", { email, password });
  return response.data;
};

export const getProfile = async (uid?: string) => {
  let response;
  if (uid) {
    response = await api.get<IUserResponse>(`/api/auth/profile?i=${uid}`);
  } else {
    response = await api.get<IUserResponse>(`/api/auth/profile`);
  }
  return response.data;
};
export const updatePassword = async (data: IUpdatePassword) => {
  const response = await api.patch<ApiResponse<any>>(
    "/api/auth/update-password",
    data
  );
  return response.data;
};

export const logOut = async () => {
  const response = await api.get("/api/auth/logout");
  return response.data;
};
