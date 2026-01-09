import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import OfficeScreen from "@/components/office/office-screen";
import { ScrollView, View, Text } from "react-native";
import NoOffice from "@/components/office/no-office";
const Office = () => {
  const { user } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-[#2b2538] pr-5 pl-5 pt-5">
      {user?.office ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <OfficeScreen />
        </ScrollView>
      ) : (
        <NoOffice />
      )}
    </SafeAreaView>
  );
};

export default Office;
