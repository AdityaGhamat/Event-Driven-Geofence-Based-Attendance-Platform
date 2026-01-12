import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as BackgroundFetch from "expo-background-fetch";
import { getTrackingOptions } from "@/lib/utils/tracking-logic";
import { updateLocation, getProfile } from "@/api/auth";
import { getDistanceFromLatLonInMeters } from "../utils/math";

const LOCATION_TASK_NAME = "BACKGROUND_LOCATION_TASK";
const FETCH_TASK_NAME = "BACKGROUND_FETCH_TASK";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }: any) => {
  if (error) return;
  if (data) {
    const { locations } = data;
    const loc = locations[0];
    try {
      await updateLocation({
        coordinates: [loc.coords.latitude, loc.coords.longitude],
      });
      console.log("📍 Location PING sent:", loc.coords.latitude);
    } catch (error) {
      console.error("Failed to send location:", error);
    }
  }
});

export const checkAndStartTracking = async () => {
  try {
    console.log("🤔 Checking Tracking Status...");
    const response = await getProfile();

    if (!response || !response.data)
      return BackgroundFetch.BackgroundFetchResult.NoData;
    const user = response.data;

    // Validate Office Data
    if (!user || !user.office || !user.office.workStartTime) {
      console.log("⚠️ No office data found.");
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Check Location
    const currentLoc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const officeLat = user.office.coordinates[0];
    const officeLong = user.office.coordinates[1];
    const radius = user.office.geofence_radius || 100;

    const distance = getDistanceFromLatLonInMeters(
      currentLoc.coords.latitude,
      currentLoc.coords.longitude,
      officeLat,
      officeLong
    );

    const isInside = distance <= radius;
    console.log(`📏 Distance: ${distance.toFixed(0)}m. Inside? ${isInside}`);

    const options = getTrackingOptions(
      user.office.workStartTime,
      user.office.workEndTime,
      isInside
    );

    const isTracking =
      await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

    if (options === null) {
      if (isTracking) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        console.log("🛑 Tracking Stopped (Off Hours)");
      }
    } else {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy:
          options.accuracy === 6
            ? Location.Accuracy.High
            : Location.Accuracy.Balanced,
        timeInterval: options.interval,
        distanceInterval: options.distance,
        foregroundService: {
          notificationTitle: "Attendance Active",
          notificationBody: isInside
            ? "You are in the office"
            : "Tracking commute...",
          notificationColor: "#9333ea",
        },
      });
      console.log(`✅ Tracking STARTED: ${options.interval / 1000}s interval`);
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error("❌ Logic Failed:", error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
};

// 3. The Brain (Background Fetch Task) - Just calls the logic above
TaskManager.defineTask(FETCH_TASK_NAME, checkAndStartTracking);

// 4. Registration
export const registerBackgroundFetch = async () => {
  try {
    const isRegistered =
      await TaskManager.isTaskRegisteredAsync(FETCH_TASK_NAME);
    if (!isRegistered) {
      await BackgroundFetch.registerTaskAsync(FETCH_TASK_NAME, {
        minimumInterval: 60 * 10,
        stopOnTerminate: false,
        startOnBoot: true,
      });
      console.log("🧠 Background Fetch Registered");
    }
  } catch (err) {
    console.log("Task Register Failed:", err);
  }
};
