import { View, Text, ScrollView } from "react-native";
import React, { memo } from "react";
import { CalendarCheck, Clock, Hammer, BarChart } from "lucide-react-native";
import type { TodayAttendanceProps } from "@/types/attendance";

const TodayAttendance = ({ slots, stats }: TodayAttendanceProps) => {
  const workingMinutes = stats?.workingMinutes || 0;
  const status = stats?.status || "NOT MARKED";
  const activeTimeStrings = stats?.activeSlots || [];

  const workingHours = (workingMinutes / 60).toFixed(1);
  const totalSlots = 32;
  const presentSlots = Math.floor(workingMinutes / 15);

  const dateStr = stats?.date
    ? new Date(stats.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" });

  const getStatusColor = (s: string) => {
    if (s === "PRESENT")
      return "bg-green-500/20 text-green-400 border-green-500/20";
    if (s === "ABSENT") return "bg-red-500/20 text-red-400 border-red-500/20";
    if (s === "HALF")
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
    return "bg-white/10 text-neutral-400 border-white/10";
  };

  return (
    <View className="w-full">
      <View className="flex-row items-center gap-3 p-4 border-b border-purple-500/10">
        <CalendarCheck size={28} color="#c084fc" />
        <View>
          <Text className="text-white text-lg font-bold">Today</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-neutral-400 text-xs">{dateStr}</Text>
            <View
              className={`px-2 py-0.5 rounded border ${getStatusColor(status).split(" ")[0]} ${getStatusColor(status).split(" ")[2]}`}
            >
              <Text
                className={`text-[10px] font-bold ${getStatusColor(status).split(" ")[1].replace("text-", "text-")}`}
              >
                {status}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row border-b border-purple-500/10 bg-[#2b2538]/50">
        <View className="flex-1 items-center justify-center p-4 border-r border-purple-500/10">
          <Clock size={16} color="#9ca3af" style={{ marginBottom: 4 }} />
          <Text className="text-white font-bold text-lg">{workingHours}h</Text>
          <Text className="text-[10px] text-neutral-400">Time</Text>
        </View>
        <View className="flex-1 items-center justify-center p-4 border-r border-purple-500/10">
          <Hammer size={16} color="#9ca3af" style={{ marginBottom: 4 }} />
          <Text className="text-white font-bold text-lg">
            {presentSlots}/{totalSlots}
          </Text>
          <Text className="text-[10px] text-neutral-400">Slots</Text>
        </View>
        <View className="flex-1 items-center justify-center p-4">
          <BarChart size={16} color="#9ca3af" style={{ marginBottom: 4 }} />
          <View
            className={`px-2 py-1 rounded ${status === "PRESENT" ? "bg-green-600" : "bg-neutral-700"}`}
          >
            <Text className="text-white text-[10px] font-bold">{status}</Text>
          </View>
          <Text className="text-[10px] text-neutral-400 mt-1">Status</Text>
        </View>
      </View>

      <View className="p-4 bg-[#2b2538]">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {slots.map((slot: any) => {
              const isPresent = activeTimeStrings.includes(slot.start);
              return (
                <View key={slot.id} className="items-center gap-1 w-16">
                  <Text className="text-[10px] text-neutral-500 font-mono">
                    {slot.start}
                  </Text>
                  <View
                    className={`w-full h-12 rounded-lg items-center justify-center ${isPresent ? "bg-[#2dd4bf] shadow-sm" : "bg-white/5 border border-white/5"}`}
                  >
                    {isPresent && (
                      <Text className="text-[#0f3d36] font-bold text-xs">
                        IN
                      </Text>
                    )}
                  </View>
                  <Text className="text-[10px] text-neutral-500 font-mono">
                    {slot.end}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default memo(TodayAttendance);
