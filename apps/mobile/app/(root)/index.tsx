import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2d283e",
        }}
      >
        <ActivityIndicator size="large" color="#d946ef" />
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? "/(dashboard)" : "/(auth)/login"} />;
}
