import { Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { days } from "@/constants/days";
import { useAuth } from "@/hooks/useAuth";

const SandT = () => {
  type DayKey = keyof typeof days;
  const { user } = useAuth();
  const dayNumber: DayKey[] = (user?.office?.workingDays ?? []).filter(
    (day): day is keyof typeof days => day in days
  );
  return (
    <View className="bg-[#3b344c] p-3 mt-8 rounded-lg border border-purple-400/50">
      <View>
        <View className="flex flex-row items-center gap-x-3 pl-2">
          <View>
            <Ionicons name="time-outline" size={22} color={"#e879f9"} />
          </View>
          <View>
            <Text className="text-white font-semibold">
              Schedule and Timings
            </Text>
          </View>
        </View>
        <View className="pl-3 mt-3">
          <View>
            <Text className="text-white">Working Hours</Text>
          </View>
          <View>
            <Text className="text-white">
              {user?.office?.workStartTime} - {user?.office?.workEndTime}
            </Text>
          </View>
        </View>
        <View className="pl-3 mt-3">
          <View>
            <Text className="text-white">Working Days</Text>
          </View>
          <View className="flex flex-row gap-x-3">
            {dayNumber.map((day) => (
              <Text key={day} className="text-white">
                {days[day]}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SandT;
