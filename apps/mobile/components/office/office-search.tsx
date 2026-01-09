import { View, TextInput } from "react-native";
import React from "react";
import { Search } from "lucide-react-native";
import type { OfficeSearchProps } from "../../types/office";

const OfficeSearch = ({ search, setSearch }: OfficeSearchProps) => {
  return (
    <View className="w-full max-w-md mx-auto relative justify-center rounded-2xl bg-[#3c354d] overflow-hidden">
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search Office"
        placeholderTextColor="#9ca3af"
        className="w-full border border-purple-400/50 rounded-2xl py-4 pl-12 pr-4 text-white text-lg focus:border-purple-400"
      />

      <View className="absolute left-4">
        <Search size={20} color="#c084fc" />
      </View>
    </View>
  );
};

export default OfficeSearch;
