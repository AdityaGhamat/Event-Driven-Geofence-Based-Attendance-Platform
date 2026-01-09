import { View, Text } from "react-native";
import React, { memo } from "react";
import { LayoutDashboard, CalendarCheck, XCircle } from "lucide-react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import type { AttendanceSummaryProps } from "@/types/attendance";

const AttendanceSummary = ({ summary }: AttendanceSummaryProps) => {
  const { presentDays = 0, absentDays = 0, attendanceRate = 0 } = summary || {};

  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (attendanceRate / 100) * circumference;

  return (
    <View className="p-6 w-full">
      <View className="flex-row items-center gap-2 mb-6">
        <LayoutDashboard size={20} color="white" />
        <Text className="text-white font-semibold text-lg">Summary</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="gap-6">
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <CalendarCheck size={16} color="#34d399" />
              <Text className="text-neutral-400 text-xs">Present</Text>
            </View>
            <Text className="text-4xl font-bold text-white ml-6">
              {presentDays}
            </Text>
          </View>

          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <XCircle size={16} color="#fb7185" />
              <Text className="text-neutral-400 text-xs">Absent</Text>
            </View>
            <Text className="text-4xl font-bold text-white ml-6">
              {absentDays}
            </Text>
          </View>
        </View>

        <View className="relative items-center justify-center">
          <Svg
            width={size}
            height={size}
            style={{ transform: [{ rotate: "-90deg" }] }}
          >
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#c084fc" />
                <Stop offset="1" stopColor="#a855f7" />
              </LinearGradient>
            </Defs>

            <Circle
              stroke="#4c1d95"
              strokeWidth={strokeWidth}
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
              strokeOpacity={0.3}
            />

            <Circle
              stroke="url(#grad)"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              r={radius}
              cx={size / 2}
              cy={size / 2}
            />
          </Svg>

          <View className="absolute items-center justify-center">
            <Text className="text-2xl font-bold text-white">
              {attendanceRate}%
            </Text>
            <Text className="text-[8px] text-neutral-400 uppercase font-bold tracking-widest">
              Rate
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(AttendanceSummary);
