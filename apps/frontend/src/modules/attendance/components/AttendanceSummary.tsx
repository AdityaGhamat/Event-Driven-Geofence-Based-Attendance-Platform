import { LayoutDashboard, CalendarCheck, XCircle } from "lucide-react";
import type { AttendanceSummaryProps } from "../types/index";

const AttendanceSummary = ({ summary }: AttendanceSummaryProps) => {
  const { presentDays = 0, absentDays = 0, attendanceRate = 0 } = summary || {};

  const radius = 95;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (attendanceRate / 100) * circumference;

  const size = radius * 2.4;

  return (
    <div className="flex flex-col h-full w-full p-8">
      <div className="flex items-center gap-2 mb-2">
        <LayoutDashboard className="w-5 h-5 text-white" />
        <h2 className="text-white font-semibold text-lg">Attendance Summary</h2>
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div className="flex flex-col gap-10">
          <div>
            <div className="flex items-center gap-2 text-neutral-400 text-sm mb-2">
              <CalendarCheck className="w-5 h-5 text-emerald-400" />
              <span>Present Days</span>
            </div>
            <span className="text-5xl font-bold text-white ml-7">
              {presentDays}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-neutral-400 text-sm mb-2">
              <XCircle className="w-5 h-5 text-rose-400" />
              <span>Absent Days</span>
            </div>
            <span className="text-5xl font-bold text-white ml-7">
              {absentDays}
            </span>
          </div>

          <div className="flex gap-1.5 ml-1 mt-2">
            <div className="h-2 w-10 rounded-full bg-purple-500"></div>
            <div className="h-2 w-10 rounded-full bg-emerald-500"></div>
            <div className="h-2 w-10 rounded-full bg-rose-500"></div>
          </div>
        </div>

        <div className="relative mr-6">
          <div
            style={{ width: size, height: size }}
            className="relative flex items-center justify-center"
          >
            <svg height={size} width={size} className="-rotate-90 transform">
              <defs>
                <linearGradient
                  id="summGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

              <circle
                stroke="#4c1d95"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={normalizedRadius}
                cx={size / 2}
                cy={size / 2}
                strokeOpacity={0.2}
                strokeLinecap="round"
              />

              <circle
                stroke="url(#summGradient)"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + " " + circumference}
                style={{
                  strokeDashoffset,
                  transition: "stroke-dashoffset 0.8s ease-in-out",
                }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={size / 2}
                cy={size / 2}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-bold text-white tracking-tight drop-shadow-md leading-none">
                {attendanceRate}%
              </span>
              <span className="text-[11px] text-neutral-400 mt-2 uppercase tracking-widest font-medium">
                Attendance Rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;
