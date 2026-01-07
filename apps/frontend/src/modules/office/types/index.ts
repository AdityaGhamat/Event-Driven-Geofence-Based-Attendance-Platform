import type { Dispatch, SetStateAction } from "react";
import type { ApiResponse } from "../../../types";
import type { DayNumberFirstAlphabet } from "../constants/days";
import { createOfficeSchema } from "../validations";
import { z } from "zod";
export interface ISideBarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hasOffice?: boolean;
  menu?: any[];
}

export interface IOfficeContext {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  office: any;
  setOffice: Dispatch<SetStateAction<any>>;
}

export interface ISearchCardProps {
  isActive: boolean;
  name: string;
  workEndTime: string;
  workStartTime: string;
}
export interface IOffice {
  _id: string;
  name: string;
  isActive: boolean;
  workStartTime: string;
  workEndTime: string;
  coordinates: number[];
  workingDays: number[];
  workers: any[];
  office_admin: any[];
  uid: string;
}

export interface IOfficeListData {
  offices: IOffice[];
  total: number;
  page: number;
  limit: number;
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

export type getOfficeResponse = ApiResponse<IOfficeListData>;

export interface IEmployeeTableProps {
  _id?: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
}

export interface IMapProps {
  latitude: number;
  longitude: number;
}

export type WorkingDay = Record<number, string>;

export type IWorkingDay = WorkingDay[];

export interface IChangeTimeProps {
  hasChanges: boolean;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  startTime: string;
  endTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
}

export interface IWorkingDaySelectorProps {
  selectedDays: DayNumberFirstAlphabet[];
  onToggle?: (day: DayNumberFirstAlphabet) => void;
  canEdit: boolean;
}

export type typeCreateOffice = z.infer<typeof createOfficeSchema>;
