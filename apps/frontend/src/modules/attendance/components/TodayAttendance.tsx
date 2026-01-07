import { CalendarCheck, Clock3, Hammer, ChartNoAxesColumn } from "lucide-react";
import type { TodayAttendanceProps } from "../types/index";

const TodayAttendance = ({ slots, stats }: TodayAttendanceProps) => {
  const workingMinutes = stats?.workingMinutes || 0;
  const status = stats?.status || "NOT MARKED";

  const activeTimeStrings = stats?.activeSlots || [];

  const dateStr = stats?.date
    ? new Date(stats.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  const workingHours = (workingMinutes / 60).toFixed(1);

  const totalSlots = 32;
  const presentSlots = Math.floor(workingMinutes / 15);

  const getStatusColor = (s: string) => {
    if (s === "PRESENT")
      return "bg-green-500/20 text-green-400 border-green-500/20";
    if (s === "ABSENT") return "bg-red-500/20 text-red-400 border-red-500/20";
    if (s === "HALF")
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
    return "bg-white/10 text-neutral-400 border-white/10"; // Default
  };

  const statusClass = getStatusColor(status);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex gap-x-2 items-center py-4 px-6 border-b border-purple-500/10">
        <CalendarCheck className="w-8 h-8 text-purple-400" />
        <span className="flex flex-col">
          <span className="text-white text-lg font-semibold">Today</span>
          <span className="flex items-center gap-x-2">
            <p className="text-sm text-neutral-300">{dateStr}</p>
            <span
              className={`px-2 py-0.5 text-xs font-bold rounded border ${statusClass}`}
            >
              {status}
            </span>
          </span>
        </span>
      </div>

      <div className="w-full bg-[#2b2538]/50 grid grid-cols-3 border-b border-purple-500/10">
        <div className="border-r border-purple-500/10 flex flex-col justify-center items-center p-6 space-y-2">
          <span className="flex gap-x-2 items-center text-neutral-400 text-sm">
            <Clock3 className="w-4 h-4" />
            <h1>Working Time</h1>
          </span>
          <span className="text-2xl text-white font-semibold">
            {workingHours} Hours
          </span>
        </div>

        <div className="border-r border-purple-500/10 flex flex-col justify-center items-center p-6 space-y-2">
          <span className="flex gap-x-2 items-center text-neutral-400 text-sm">
            <Hammer className="w-4 h-4" />
            <h1>Present Slots</h1>
          </span>
          <span className="text-2xl text-white font-semibold">
            {presentSlots} / {totalSlots}
          </span>
        </div>

        <div className="flex flex-col justify-center items-center p-6 space-y-2">
          <span className="flex gap-x-2 items-center text-neutral-400 text-sm">
            <ChartNoAxesColumn className="w-4 h-4" />
            <h1>Status</h1>
          </span>
          <span
            className={`px-3 py-1 font-semibold rounded shadow-lg ${
              status === "PRESENT"
                ? "bg-green-600 text-white shadow-green-600/20"
                : "bg-neutral-700 text-neutral-300"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="flex-1 bg-[#2b2538] p-6 flex items-center overflow-hidden">
        <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
          <div className="flex gap-4">
            {slots.map((slot) => {
              const isPresent = activeTimeStrings.includes(slot.start);

              return (
                <div
                  key={slot.id}
                  className="flex flex-col items-center gap-y-2 min-w-17.5"
                >
                  <span className="text-xs text-neutral-500 font-mono">
                    {slot.start}
                  </span>
                  <div
                    className={`
                      w-full h-14 rounded-lg flex items-center justify-center font-bold text-sm transition-all
                      ${
                        isPresent
                          ? "bg-[#2dd4bf] text-[#0f3d36] shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                          : "bg-white/5 border border-white/5"
                      }
                    `}
                  >
                    {isPresent && "IN"}
                  </div>
                  <span className="text-xs text-neutral-600 font-mono">
                    {slot.end}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayAttendance;
