import { api } from "../../../api";
import type { ApiResponse } from "../../../types";
import type {
  IEmployeeTableProps,
  IOffice,
  getOfficeResponse,
  typeCreateOffice,
} from "../types";
export async function getOffices(search: string) {
  const res = await api.get<getOfficeResponse>(`/api/office/get?q=${search}`);
  return res.data;
}

export async function joinOffice(office_id: string) {
  const res = await api.patch<ApiResponse<any>>(
    `/api/auth/join-office/${office_id}`
  );
  return res.data;
}
export async function leaveOffice(office_id: string) {
  const res = await api.patch<ApiResponse<any>>(
    `/api/auth/leave-office/${office_id}`
  );
  return res.data;
}

export async function getWorkers() {
  const res = await api.get<ApiResponse<IEmployeeTableProps[]>>(
    `/api/office/workers`
  );
  return res.data;
}

export async function changeActiveStatus(isActive: boolean) {
  const res = await api.patch<ApiResponse<IOffice>>(
    "/api/office/change-active-status",
    {
      isActive: isActive,
    }
  );
  return res.data;
}

export async function updateCoordinates(coordinates: number[]) {
  const res = await api.patch<ApiResponse<IOffice>>(
    "/api/office/update-location",
    {
      coordinates,
    }
  );
  return res.data;
}

export async function changeWorkingDays(workingDays: number[]) {
  const res = await api.patch<ApiResponse<IOffice>>(
    "/api/office/change-working-days",
    {
      workingDays,
    }
  );
  return res.data;
}

export async function changeWorkingTime(
  workStartTime: string,
  workEndTime: string
) {
  const res = await api.patch("/api/office/change-working-times", {
    workStartTime: workStartTime,
    workEndTime: workEndTime,
  });
  return res.data;
}

export const updateAdminRole = async (officeId: string, newAdminId: string) => {
  const res = await api.patch("/api/office/update-admin", {
    officeId,
    new_adminId: newAdminId,
  });
  return res.data;
};

export const removeAdminRole = async (
  officeId: string,
  targetAdminId: string
) => {
  const res = await api.patch("/api/office/remove-admin", {
    officeId,
    new_adminId: targetAdminId,
  });
  return res.data;
};

export const updateRadius = async (radius: number | string) => {
  const res = await api.patch(`/api/office/radius?rad=${radius}`);
  return res.data;
};

export const createOffice = async (office: typeCreateOffice) => {
  const res = await api.post<ApiResponse<IOffice>>(
    "/api/office/create-new-office",
    office
  );
  return res.data;
};
