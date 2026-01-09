import { IAnalyticsResponse } from "@/types/attendance";
import { api } from "./api";
import { ApiResponse } from "@/types/api";

export const getAnalytics = async (employee_id?: string) => {
  let response;
  if (employee_id) {
    response = await api.get<ApiResponse<IAnalyticsResponse>>(
      `/api/attendance/analytics?uid=${employee_id}`
    );
  } else {
    response = await api.get<ApiResponse<IAnalyticsResponse>>(
      "/api/attendance/analytics"
    );
  }
  return response.data;
};
