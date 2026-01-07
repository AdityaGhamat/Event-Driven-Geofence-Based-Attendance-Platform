import { ArrowLeft } from "lucide-react";
import type { MonthlyOverviewProps } from "../types";

const DAYS_IN_MONTH = 31;
const START_OFFSET = 4;
const TOTAL_CELLS = 42;

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const MonthlyOverview = ({ monthData = [] }: MonthlyOverviewProps) => {
  const cells = Array.from({ length: TOTAL_CELLS }, (_, index) => {
    const dayNumber = index - START_OFFSET + 1;
    return dayNumber > 0 && dayNumber <= DAYS_IN_MONTH ? dayNumber : null;
  });

  const getStatus = (day: number) => {
    if (!monthData.length) return null;

    const record = monthData.find((record) => {
      const recordDate = new Date(record.date);
      return recordDate.getDate() === day;
    });

    return record?.status || null;
  };

  const getDayClass = (status: string | null) => {
    if (status === "PRESENT")
      return "bg-[#2dd4bf]/80 text-white shadow-[0_0_12px_rgba(45,212,191,0.35)]";
    if (status === "HALF")
      return "bg-[#eab308]/80 text-white shadow-[0_0_12px_rgba(234,179,8,0.35)]";
    if (status === "ABSENT")
      return "bg-[#f43f5e]/80 text-white shadow-[0_0_12px_rgba(244,63,94,0.35)]";

    // Default / Empty days
    return "bg-white/5 text-neutral-300 hover:bg-white/10";
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-white/10 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-white font-semibold text-lg">Monthly Overview</h2>
        </div>
        <span className="text-sm text-neutral-400">January 2025</span>
      </div>

      <div className="grid grid-cols-7 text-center text-neutral-400 text-sm mb-2">
        {weekDays.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 gap-3 flex-1">
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={idx} className="h-14" />;
          }

          const status = getStatus(day);

          return (
            <div
              key={idx}
              className={`
                h-14 flex items-center justify-center rounded-lg text-sm font-semibold transition-all cursor-pointer
                ${getDayClass(status)}
              `}
              title={
                status ? `${status} - Jan ${day}` : `No Record - Jan ${day}`
              }
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-center gap-6 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#2dd4bf]/80" />
          Present
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#eab308]/80" />
          Half-Present
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#f43f5e]/80" />
          Absent
        </div>
      </div>
    </div>
  );
};

export default MonthlyOverview;
