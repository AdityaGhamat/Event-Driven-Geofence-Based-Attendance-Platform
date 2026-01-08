import { Slot, Redirect } from "expo-router";
import { ImageBackground, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Redirect href="/(dashboard)" />;
  }
  return (
    <ImageBackground
      source={{ uri: "https://i.ibb.co/xtFL0yfj/login.jpg" }}
      style={{ flex: 1, width: "100%", height: "100%" }}
      resizeMode="cover"
      blurRadius={3}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(10, 5, 20, 0.6)" }}>
        <Slot />
      </View>
    </ImageBackground>
  );
}
