import type React from "react";

const AttendanceCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-130 bg-[#3c354d] border border-purple-500/30 rounded-md flex flex-col overflow-hidden">
      {children}
    </div>
  );
};

export default AttendanceCard;
