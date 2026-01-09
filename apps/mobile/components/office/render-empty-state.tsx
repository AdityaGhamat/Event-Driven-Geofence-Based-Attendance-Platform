import { View, Text } from "react-native";
import React from "react";
import { Search } from "lucide-react-native";

const RenderEmptyState = () => {
  return (
    <View className="flex-1 items-center justify-center pt-20 px-6">
      <View className="w-24 h-24 bg-purple-500/10 rounded-full items-center justify-center mb-6 border border-purple-500/20">
        <Search size={40} color="#d8b4fe" />
      </View>

      <View className="items-center gap-y-2">
        <Text className="text-white text-xl font-bold text-center">
          Find Your Workspace
        </Text>

        <Text className="text-neutral-400 text-center leading-6 max-w-[280px]">
          Enter your office name in the search bar above to join your team.
        </Text>
      </View>
    </View>
  );
};

export default RenderEmptyState;
