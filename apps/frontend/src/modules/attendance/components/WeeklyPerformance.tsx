import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BarChart3 } from "lucide-react";
import type { WeeklyPerformanceProps } from "../types";

const parseDate = (dateStr: string) => {
  if (!dateStr || dateStr.length !== 8) return new Date();
  const y = parseInt(dateStr.substring(0, 4));
  const m = parseInt(dateStr.substring(4, 6)) - 1;
  const d = parseInt(dateStr.substring(6, 8));
  return new Date(y, m, d);
};

const WeeklyPerformance = ({ data, average }: WeeklyPerformanceProps) => {
  const processChartData = () => {
    const daysTemplate = [
      { label: "M", jsDay: 1 },
      { label: "T", jsDay: 2 },
      { label: "W", jsDay: 3 },
      { label: "T", jsDay: 4 },
      { label: "F", jsDay: 5 },
      { label: "S", jsDay: 6 },
      { label: "S", jsDay: 0 },
    ];

    return daysTemplate.map((template) => {
      const record = data.find((r) => {
        const dateObj = parseDate(r.date);
        return dateObj.getDay() === template.jsDay;
      });

      return {
        day: template.label,
        hours: record?.workingMinutes
          ? parseFloat((record.workingMinutes / 60).toFixed(1))
          : 0,
        status:
          record?.status === "ABSENT" || !record?.status
            ? "inactive"
            : "active",
      };
    });
  };

  const chartData = processChartData();
  const avgHours = (average / 60).toFixed(1);

  return (
    <div className="flex flex-col h-full w-full p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-white" />
          <h2 className="text-white font-semibold text-lg">
            Weekly Performance
          </h2>
        </div>
        <span className="text-sm text-neutral-400">
          Avg: {avgHours} hrs/day
        </span>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `${value} hrs`}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                backgroundColor: "#2b2538",
                borderColor: "rgba(168,85,247,0.3)",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#fff" }}
              formatter={(value: any) => [`${value} hrs`, "Working Time"]}
            />
            <Bar dataKey="hours" radius={[4, 4, 4, 4]} barSize={40}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.status === "inactive" || entry.hours === 0
                      ? "#4b5563"
                      : "#2dd4bf"
                  }
                  opacity={
                    entry.status === "inactive" || entry.hours === 0 ? 0.3 : 1
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyPerformance;
