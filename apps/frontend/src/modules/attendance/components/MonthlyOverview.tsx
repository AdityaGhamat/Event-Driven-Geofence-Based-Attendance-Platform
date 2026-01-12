import { ArrowLeft } from "lucide-react";
import type { MonthlyOverviewProps } from "../types";
import { useMemo } from "react";

const TOTAL_CELLS = 42;
const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const parseDate = (dateStr: string) => {
  if (!dateStr || dateStr.length !== 8) return new Date();
  const y = parseInt(dateStr.substring(0, 4));
  const m = parseInt(dateStr.substring(4, 6)) - 1;
  const d = parseInt(dateStr.substring(6, 8));
  return new Date(y, m, d);
};

const MonthlyOverview = ({ monthData = [] }: MonthlyOverviewProps) => {
  const { daysInMonth, startOffset, monthLabel } = useMemo(() => {
    const referenceDate =
      monthData.length > 0 ? parseDate(monthData[0].date) : new Date();

    const year = referenceDate.getFullYear();
    const month = referenceDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const startOffset = new Date(year, month, 1).getDay();

    const monthLabel = referenceDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    return { daysInMonth, startOffset, monthLabel };
  }, [monthData]);

  const cells = Array.from({ length: TOTAL_CELLS }, (_, index) => {
    const dayNumber = index - startOffset + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const getStatus = (day: number) => {
    if (!monthData.length) return null;

    const record = monthData.find((record) => {
      const recordDate = parseDate(record.date);
      return recordDate.getDate() === day;
    });

    return record?.status || null;
  };

  const getDayClass = (status: string | null) => {
    if (status === "PRESENT")
      return "bg-[#2dd4bf]/80 text-white shadow-[0_0_12px_rgba(45,212,191,0.35)]";

    if (status === "HALF" || status === "HALF_PRESENT")
      return "bg-[#eab308]/80 text-white shadow-[0_0_12px_rgba(234,179,8,0.35)]";
    if (status === "ABSENT")
      return "bg-[#f43f5e]/80 text-white shadow-[0_0_12px_rgba(244,63,94,0.35)]";

    return "bg-white/5 text-neutral-300 hover:bg-white/10";
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-white/10 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-white font-semibold text-lg">Monthly Overview</h2>
        </div>

        <span className="text-sm text-neutral-400">{monthLabel}</span>
      </div>

      <div className="grid grid-cols-7 text-center text-neutral-400 text-sm mb-2">
        {weekDays.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 gap-3 flex-1">
        {cells.map((day, idx) => {
          // Stop rendering if we run out of days
          if (!day && idx > daysInMonth + startOffset) return <div key={idx} />;

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
                status
                  ? `${status} - ${monthLabel.split(" ")[0]} ${day}`
                  : `No Record`
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
