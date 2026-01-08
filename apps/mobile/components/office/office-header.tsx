import { Text, View } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

const OfficeHeader = () => {
  const { user } = useAuth();

  return (
    <View className="bg-[#3b344c] p-3 rounded-lg border border-purple-400/50 shadow-sm">
      <View className="flex flex-row gap-x-3 items-center">
        <View className="w-12 h-12 bg-white rounded-full items-center justify-center border border-gray-600">
          <Ionicons name="business" size={24} color="#e879f9" />
        </View>

        <View className="flex-1">
          <Text
            className="text-white text-xl font-bold flex-wrap"
            numberOfLines={1}
          >
            {user?.office?.name || "Terna College Of Engineering"}
          </Text>

          <Text className="text-xs text-gray-300" numberOfLines={1}>
            ID: {user?.office?._id || "kjkljaslknfnknlakndslfk"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OfficeHeader;
