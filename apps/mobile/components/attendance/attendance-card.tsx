import { View } from "react-native";
import React from "react";

const AttendanceCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="w-full bg-[#3c354d] border border-purple-400/50 rounded-xl overflow-hidden mb-5">
      {children}
    </View>
  );
};

export default AttendanceCard;
