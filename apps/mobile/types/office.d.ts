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

