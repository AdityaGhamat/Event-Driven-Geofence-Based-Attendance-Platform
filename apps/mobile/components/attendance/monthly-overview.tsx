import { View, Text, Pressable } from "react-native";
import React, { memo } from "react";
import { ArrowLeft } from "lucide-react-native";
import type { MonthlyOverviewProps } from "@/types/attendance";
import { parseDate } from "@/constants/days";
const MonthlyOverview = ({ monthData = [] }: MonthlyOverviewProps) => {
  const DAYS_IN_MONTH = 31;
  const START_OFFSET = 4; // Adjust based on actual month
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const cells = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - START_OFFSET + 1;
    return dayNumber > 0 && dayNumber <= DAYS_IN_MONTH ? dayNumber : null;
  });

  const getStatus = (day: number) => {
    if (!monthData.length) return null;
    const record = monthData.find((r) => parseDate(r.date).getDate() === day);
    return record?.status || null;
  };

  const getDayColor = (status: string | null) => {
    if (status === "PRESENT") return "bg-[#2dd4bf] border-[#2dd4bf]";
    if (status === "HALF") return "bg-[#eab308] border-[#eab308]";
    if (status === "ABSENT") return "bg-[#f43f5e] border-[#f43f5e]";
    return "bg-white/5 border-transparent";
  };

  return (
    <View className="p-4">
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center gap-2">
          {/* Back button logic can be added here later if needed */}
          <Text className="text-white font-semibold text-lg">
            Monthly Overview
          </Text>
        </View>
        <Text className="text-xs text-neutral-400">Jan 2025</Text>
      </View>

      <View className="flex-row mb-2">
        {weekDays.map((d, i) => (
          <View key={i} className="w-[14.28%] items-center">
            <Text className="text-neutral-500 text-xs font-bold">{d}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {cells.map((day, idx) => {
          if (!day) return <View key={idx} className="w-[14.28%] h-10" />;

          const status = getStatus(day);

          return (
            <View key={idx} className="w-[14.28%] h-12 p-1">
              <View
                className={`flex-1 items-center justify-center rounded-lg border ${getDayColor(status)}`}
              >
                <Text
                  className={`text-xs font-bold ${status ? "text-white" : "text-neutral-400"}`}
                >
                  {day}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View className="flex-row justify-center gap-4 mt-4">
        <View className="flex-row items-center gap-1.5">
          <View className="w-2 h-2 rounded-full bg-[#2dd4bf]" />
          <Text className="text-[10px] text-neutral-400">Present</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className="w-2 h-2 rounded-full bg-[#eab308]" />
          <Text className="text-[10px] text-neutral-400">Half</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className="w-2 h-2 rounded-full bg-[#f43f5e]" />
          <Text className="text-[10px] text-neutral-400">Absent</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(MonthlyOverview);
