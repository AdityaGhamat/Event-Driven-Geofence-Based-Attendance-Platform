import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import OfficeScreen from "@/components/office/office-screen";
import { ScrollView, Alert, Linking, Platform } from "react-native";
import NoOffice from "@/components/office/no-office";
import * as TaskManager from "expo-task-manager";

import * as Location from "expo-location";
import * as IntentLauncher from "expo-intent-launcher";
import {
  checkAndStartTracking,
  registerBackgroundFetch,
} from "@/lib/services/location-service";

const Office = () => {
  const { user } = useAuth();
  const checkTasks = async () => {
    const tasks = await TaskManager.getRegisteredTasksAsync();
    console.log("📋 Registered Tasks:", tasks);
    Alert.alert("Registered Tasks", JSON.stringify(tasks));
  };

  useEffect(() => {
    const initAttendanceSystem = async () => {
      if (!user?.office) return;

      const { status: foreStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (foreStatus !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need location access to check if you are in the office.",
          [{ text: "Open Settings", onPress: openSettings }]
        );
        return;
      }

      const { status: backStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backStatus !== "granted") {
        Alert.alert(
          "Background Access Needed",
          "To mark attendance automatically when the app is closed, please select 'Always Allow' in settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: openSettings },
          ]
        );
      }

      console.log("✅ Starting Background Service...");
      await registerBackgroundFetch();

      console.log("🚀 Force starting tracking logic...");
      await checkAndStartTracking();
    };

    initAttendanceSystem();
  }, [user]);

  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
        { data: "package:" + "com.aditya.attendance" } // ⚠️ Replace with your actual package name from app.json
      );
    }
  };

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
