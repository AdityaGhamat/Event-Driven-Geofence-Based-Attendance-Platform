import { View, Text } from "react-native";
import React, { memo } from "react";
import { BarChart3 } from "lucide-react-native";
import type { WeeklyPerformanceProps } from "@/types/attendance";
import { parseDate } from "@/constants/days";

const WeeklyPerformance = ({ data, average }: WeeklyPerformanceProps) => {
  const daysTemplate = ["M", "T", "W", "T", "F", "S", "S"];
  const jsDays = [1, 2, 3, 4, 5, 6, 0];

  const chartData = jsDays.map((dayNum, index) => {
    const record = data.find((r) => parseDate(r.date).getDay() === dayNum);
    const hours = record?.workingMinutes ? record.workingMinutes / 60 : 0;
    return {
      label: daysTemplate[index],
      hours: hours,
      heightPercentage: Math.min((hours / 12) * 100, 100),
      isActive: hours > 0,
    };
  });

  const avgHours = (average / 60).toFixed(1);

  return (
    <View className="p-6 w-full h-80">
      <View className="flex-row justify-between items-start mb-8">
        <View className="flex-row items-center gap-2">
          <BarChart3 size={20} color="white" />
          <Text className="text-white font-semibold text-lg">Weekly</Text>
        </View>
        <Text className="text-xs text-neutral-400">Avg: {avgHours}h / day</Text>
      </View>

      <View className="flex-1 flex-row items-end justify-between gap-2 border-b border-white/5 pb-2">
        {chartData.map((item, index) => (
          <View key={index} className="items-center flex-1 gap-2">
            <View className="w-full h-40 justify-end items-center">
              {item.hours > 0 && (
                <Text className="text-[10px] text-white mb-1">
                  {item.hours.toFixed(1)}
                </Text>
              )}
              <View
                style={{ height: `${item.heightPercentage}%` }}
                className={`w-full rounded-t-md ${item.isActive ? "bg-[#2dd4bf]" : "bg-neutral-700/30"}`}
              />
            </View>

            <Text className="text-neutral-500 text-xs font-bold">
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default memo(WeeklyPerformance);
