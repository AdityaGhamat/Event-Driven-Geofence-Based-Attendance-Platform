import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useAuth } from "@/hooks/useAuth";
import { MapHtml } from "@/constants/mapHtml";

const OfficeMap = () => {
  const { user } = useAuth();
  const coords = user?.office?.coordinates;

  if (!coords || coords.length < 2) {
    return (
      <View className="bg-[#3b344c] p-3 mt-8 rounded-lg border border-purple-400/50">
        <View className="flex flex-row gap-x-3 items-center pl-2 mb-4">
          <Ionicons name="location-outline" size={22} color={"#e879f9"} />
          <Text className="text-white font-semibold">Location</Text>
        </View>
        <View className="h-40 justify-center items-center bg-[#2d283e] rounded-md">
          <Text className="text-gray-400 italic">Location not available</Text>
        </View>
      </View>
    );
  }

  const [lat, lng] = coords;
  const mapHtml = MapHtml(user, lat, lng, 17);

  return (
    <View className="bg-[#3b344c] p-3 mt-8 rounded-lg border border-purple-400/50">
      <View className="flex flex-row gap-x-3 items-center pl-2 mb-3">
        <View>
          <Ionicons name="location-outline" size={22} color={"#e879f9"} />
        </View>
        <View>
          <Text className="text-white font-semibold">Location</Text>
        </View>
      </View>

      <View className="h-64 rounded-md overflow-hidden bg-gray-800 relative">
        <WebView
          originWhitelist={["*"]}
          source={{ html: mapHtml }}
          style={{ flex: 1 }}
          scrollEnabled={false}
          startInLoadingState={true}
          renderLoading={() => (
            <View className="absolute inset-0 justify-center items-center bg-[#3b344c]">
              <ActivityIndicator size="large" color="#d946ef" />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default OfficeMap;
