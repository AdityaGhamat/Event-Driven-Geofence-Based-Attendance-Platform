import { Building, LogOut } from "lucide-react";
import { changeActiveStatus, leaveOffice } from "../api";
import { useAuth } from "../../auth/hooks/useAuth";
import { useState, useEffect } from "react";

import { notify } from "../../../components/Toast";

const OfficeHeader = () => {
  const { user, refetchUser } = useAuth();

  const [isActive, setIsActive] = useState<boolean>(
    user?.office?.isActive ?? false
  );

  useEffect(() => {
    if (user?.office?.isActive !== undefined) {
      setIsActive(user.office.isActive);
    }
  }, [user?.office?.isActive]);

  const onLeaveOffice = () => {
    if (!user?.office?._id) return;

    notify.confirm(
      "You will lose access to all office data and attendance records.",
      async () => {
        try {
          const res = await leaveOffice(user.office._id);
          if (res.success) {
            notify.success(
              "Left Office",
              "You have successfully left the office."
            );
            await refetchUser();
          }
        } catch (error) {
          notify.error(
            "Action Failed",
            "Could not leave office. Please try again."
          );
        }
      }
    );
  };

  const role = user?.role;
  const isAdmin = role === "admin" || role === "super_admin";

  async function handleStatusChange() {
    const newStatus = !isActive;

    setIsActive(newStatus);

    try {
      const res = await changeActiveStatus(newStatus);
      if (res.success) {
        await refetchUser();

        notify.success(
          "Status Updated",
          `Office is now ${newStatus ? "Active" : "Inactive"}`
        );
      } else {
        setIsActive(!newStatus);

        notify.error("Update Failed", "Could not update office status.");
      }
    } catch (error) {
      console.error(error);

      setIsActive(!newStatus);

      notify.error("Error", "Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="
        border rounded-xl p-4
        bg-[#3c354d]
        flex flex-col gap-y-4
        md:flex-row md:items-center md:justify-between
        border-purple-500/30
      "
    >
      <div className="flex items-center gap-x-4">
        <div className="flex items-center justify-center w-11 h-11 bg-white rounded-full shrink-0">
          <Building className="w-5 h-5 text-fuchsia-500" />
        </div>
        <div className="min-w-0">
          <h1 className="font-bold text-xl md:text-2xl text-white truncate">
            {user?.office?.name || "Office Location"}
          </h1>
          <span className="text-sm text-white/60 block truncate">
            ID: {user?.office?._id}
          </span>
        </div>
      </div>

      <span className="flex gap-x-3">
        {isAdmin && (
          <button
            className="
            w-full md:w-auto
            flex items-center justify-center gap-x-2
            px-4 py-3
            border border-purple-500
            text-purple-400
            font-semibold
            rounded-xl
            hover:bg-purple-500 hover:text-white
            transition-all duration-200
            shadow-[0_0_15px_rgba(168,85,247,0.15)]
            hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]
          "
            onClick={handleStatusChange}
          >
            <span
              className={`w-3 h-3 rounded-full ${
                isActive
                  ? "bg-green-400 shadow-[0_0_10px_#4ade80]"
                  : "bg-red-400 shadow-[0_0_10px_#f87171]"
              }`}
            ></span>
            <span className="text-white text-sm">
              {isActive ? "Active" : "Inactive"}
            </span>
          </button>
        )}

        <button
          onClick={onLeaveOffice}
          className="
          w-full md:w-auto
          flex items-center justify-center gap-x-2
          px-4 py-3
          border border-purple-400
          text-red-400
          font-semibold
          rounded-xl
          hover:bg-red-500 hover:text-white
          transition-all duration-200
        "
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium text-white">Leave Office</span>
        </button>
      </span>
    </div>
  );
};

export default OfficeHeader;
