import { joinOffice } from "../api";
import type { IOffice } from "../types";
import { Clock } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";

const OfficeCard = (props: IOffice) => {
  const { refetchUser } = useAuth();
  const office = props;
  const handleJoinButton = async () => {
    const res = await joinOffice(office._id);
    if (res.success) {
      await refetchUser();
    }
  };
  return (
    <div className="w-full max-w-sm border border-purple-400 bg-[#3c354d] flex flex-col items-center gap-y-2 rounded-2xl p-5">
      <h1 className="text-lg text-center">{office.name}</h1>
      {office.isActive ? (
        <span className="flex gap-x-2 items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-green-400"></span>
          <span className="text-white font-medium">Active</span>
        </span>
      ) : (
        <span className="text-red-400">Not Active</span>
      )}

      <div className="border-b-fuchsia-500 bg-linear-to-r border w-full"></div>

      <div className="flex gap-y-1 gap-x-2">
        <Clock />
        <span>
          Working Hours: {office.workStartTime} - {office.workEndTime}
        </span>
      </div>
      <button
        className="mt-2 px-6 py-3
              border border-purple-500
              text-white
              font-semibold
              rounded-xl
              hover:bg-purple-500 hover:text-white
              transition-all duration-200
              shadow-[0_0_15px_rgba(168,85,247,0.15)]
              hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
        onClick={handleJoinButton}
      >
        Join Office
      </button>
    </div>
  );
};

export default OfficeCard;
