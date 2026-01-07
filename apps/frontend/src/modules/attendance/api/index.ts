import { api } from "../../../api";
import type { ApiResponse } from "../../../types";
import type { IAnalyticsResponse } from "../types";

export const getAnalytics = async (employee_id?: string) => {
  let response;
  if (employee_id) {
    response = await api.get<ApiResponse<IAnalyticsResponse>>(
      `/api/attendance/analytics/${employee_id}`
    );
  } else {
    response = await api.get<ApiResponse<IAnalyticsResponse>>(
      "/api/attendance/analytics"
    );
  }
  return response.data;
};
