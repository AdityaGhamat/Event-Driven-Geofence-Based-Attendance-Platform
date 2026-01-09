import { Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OfficeSearch from "./office-search";
import SearchResults from "./search-results";

const NoOffice = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="pt-6 px-4 pb-2">
        <OfficeSearch search={search} setSearch={setSearch} />
      </View>
      <View className="flex-1">
        <SearchResults search={search} />
      </View>
    </SafeAreaView>
  );
};

export default NoOffice;
