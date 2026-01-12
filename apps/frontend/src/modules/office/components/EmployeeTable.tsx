import {
  MoreVertical,
  ShieldPlus,
  ShieldMinus,
  XCircle,
  Loader2,
} from "lucide-react";
import type { IEmployeeTableProps } from "../types";
import { useAuth } from "../../auth/hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { updateAdminRole, removeAdminRole } from "../api";
import { useNavigate } from "react-router";
import { notify } from "../../../components/Toast";
import Loading from "../../../components/Loading";

interface EmployeeTableProps {
  employees: IEmployeeTableProps[];
  onUpdate?: () => void;
  isFetching?: boolean; // 👈 2. Make sure this prop exists
}

const EmployeeTable = ({
  employees,
  onUpdate,
  isFetching,
}: EmployeeTableProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // ... (Refs and useEffect remain the same) ...
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const canEdit = user?.role === "admin" || user?.role === "super_admin";

  // ... (handleAction and onAttendanceProfile remain the same) ...
  const handleAction = async (
    action: "promote" | "demote",
    targetId: string
  ) => {
    if (!user?.office?._id) return;
    setIsActionLoading(true);
    try {
      let res;
      if (action === "promote") {
        res = await updateAdminRole(user.office._id, targetId);
      } else {
        res = await removeAdminRole(user.office._id, targetId);
      }
      if (res.success) {
        notify.success(
          action === "promote" ? "Promoted" : "Demoted",
          action === "promote" ? "User is now an Admin" : "Admin removed"
        );
        if (onUpdate) onUpdate();
        setActiveMenuId(null);
      }
    } catch (error: any) {
      console.error(error);
      notify.error("Action Failed", error.response?.data?.message || "Error");
    } finally {
      setIsActionLoading(false);
    }
  };

  const onAttendanceProfile = async (
    employee: IEmployeeTableProps,
    employeeId: string
  ) => {
    try {
      if (String(employeeId) === String(user?._id)) {
        navigate("/dashboard/profile");
      } else if (canEdit) {
        navigate("/dashboard/attendance/profile", { state: employee });
      }
    } catch (error: any) {
      notify.error("Viewing Profile", error.message);
    }
  };

  // ✅ 3. USE YOUR COMPONENT HERE
  // If the page is fetching data, show your full-screen loader instead of the table
  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="mt-6 border border-purple-500/30 rounded-xl bg-[#3c354d] overflow-hidden shadow-2xl min-h-100 flex flex-col">
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex-1">
        <table className="w-full border-collapse text-left">
          {/* ... Table Header ... */}
          <thead className="bg-[#2a253b] sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">
                Status
              </th>
              {canEdit && (
                <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {employees.map((employee) => {
              const isCurrentUser = String(employee._id) === String(user?._id);
              const isTargetSuperAdmin = employee.role === "super_admin";

              return (
                <tr
                  key={employee._id}
                  onClick={() =>
                    onAttendanceProfile(employee, employee?._id as string)
                  }
                  className={`${
                    isCurrentUser
                      ? "bg-white/5 border-l-4 border-fuchsia-500"
                      : ""
                  } group hover:bg-white/2 transition-colors duration-200 cursor-pointer`}
                >
                  {/* ... Table Data Rows (Avatar, Email, Role, Status) ... */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-tr from-fuchsia-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white group-hover:text-fuchsia-300 transition-colors">
                          {employee.name} {isCurrentUser && "(You)"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border bg-blue-500/10 text-blue-300 border-blue-500/20">
                      <span className="capitalize">{employee.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {employee.isActive ? "Active" : "Inactive"}
                    </div>
                  </td>

                  {canEdit && (
                    <td className="px-6 py-4 whitespace-nowrap text-right relative">
                      {!isCurrentUser && !isTargetSuperAdmin && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(
                                activeMenuId === (employee?._id as string)
                                  ? null
                                  : (employee?._id as string)
                              );
                            }}
                            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* 4. Small Loader for Buttons (Keep inline Loader2 here) */}
                          {activeMenuId === employee._id && (
                            <div
                              ref={menuRef}
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-8 top-8 w-48 bg-[#2a253b] border border-purple-500/30 rounded-xl shadow-2xl z-50 overflow-hidden"
                            >
                              <div className="p-1 flex flex-col gap-1">
                                {employee.role === "user" ? (
                                  <button
                                    disabled={isActionLoading}
                                    onClick={() =>
                                      handleAction(
                                        "promote",
                                        employee?._id as string
                                      )
                                    }
                                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-purple-500 rounded-lg flex items-center gap-2"
                                  >
                                    {isActionLoading ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <ShieldPlus className="w-4 h-4" />
                                    )}
                                    Make Admin
                                  </button>
                                ) : (
                                  <button
                                    disabled={isActionLoading}
                                    onClick={() =>
                                      handleAction(
                                        "demote",
                                        employee?._id as string
                                      )
                                    }
                                    className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-red-500/20 rounded-lg flex items-center gap-2"
                                  >
                                    {isActionLoading ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <ShieldMinus className="w-4 h-4" />
                                    )}
                                    Remove Admin
                                  </button>
                                )}
                                <div className="h-px bg-white/10 my-1 mx-2" />
                                <button
                                  onClick={() => setActiveMenuId(null)}
                                  className="w-full text-left px-3 py-2 text-sm text-white/50 hover:bg-white/5 rounded-lg flex items-center gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
