import type { Dispatch, SetStateAction } from "react";
import { ApiResponse } from "./api";
export interface IEmployeeTableProps {
  _id?: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
}

export interface EmployeeListProps {
  employees: IEmployeeTable[];
}

export interface OfficeSearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export interface IOfficeListData {
  offices: IOffice[];
  total: number;
  page: number;
  limit: number;
}
