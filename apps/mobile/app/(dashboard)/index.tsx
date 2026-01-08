import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import OfficeScreen from "@/components/office/office-screen";
import { ScrollView } from "react-native";
const Office = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#2b2538] pr-5 pl-5 pt-5">
      <ScrollView>
        <OfficeScreen />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Office;
