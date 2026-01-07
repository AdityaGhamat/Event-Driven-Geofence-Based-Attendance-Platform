import { Building, Users, CalendarCheck, Settings2 } from "lucide-react";
export const menuUser = [
  {
    key: 1,
    name: "Office",
    icon: <Building className="h-5 w-5" />,
    path: "/dashboard/office",
    exact: true,
  },
  {
    key: 2,
    name: "Profile",
    icon: <Users className="h-5 w-5" />,
    path: "/dashboard/profile",
    exact: true,
  },
  {
    key: 3,
    name: "Attendance",
    icon: <CalendarCheck className="h-5 w-5" />,
    path: "/dashboard/attendance",
    exact: true,
  },
  {
    key: 4,
    name: "Settings",
    icon: <Settings2 className="h-5 w-5" />,
    path: "/dashboard/office/settings",
  },
];
