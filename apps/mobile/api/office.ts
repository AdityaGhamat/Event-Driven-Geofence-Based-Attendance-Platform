import { api } from "./api";
import { ApiResponse } from "@/types/api";
import type { IEmployeeTableProps, IOfficeListData } from "@/types/office";
export async function getWorkers() {
  const res =
    await api.get<ApiResponse<IEmployeeTableProps[]>>(`/api/office/workers`);
  return res.data;
}

export async function leaveOffice(office_id: string) {
  const res = await api.patch<ApiResponse<any>>(
    `/api/auth/leave-office/${office_id}`
  );
  return res.data;
}

export async function getOffices(search: string) {
  const res = await api.get<ApiResponse<IOfficeListData>>(
    `/api/office/get?q=${search}`
  );
  return res.data;
}
export async function joinOffice(office_id: string) {
  const res = await api.patch<ApiResponse<any>>(
    `/api/auth/join-office/${office_id}`
  );
  return res.data;
}
