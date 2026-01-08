import { api } from "./api";
import { ApiResponse } from "@/types/api";
import type { IEmployeeTableProps } from "@/types/office";
export async function getWorkers() {
  const res =
    await api.get<ApiResponse<IEmployeeTableProps[]>>(`/api/office/workers`);
  return res.data;
}
