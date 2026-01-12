import { Slot, Redirect } from "expo-router";
import { View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Image } from "expo-image";

const BG_IMAGE =
  "https://res.cloudinary.com/doz0tncag/image/upload/c_fill,w_1080,h_1920,f_auto,q_auto/login_bjcxbj.jpg";
export default function AuthLayout() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Redirect href="/(dashboard)" />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: BG_IMAGE }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        contentFit="cover"
        cachePolicy="disk"
        transition={300}
        blurRadius={3}
      />
      <View style={{ flex: 1, backgroundColor: "rgba(10, 5, 20, 0.6)" }}>
        <Slot />
      </View>
    </View>
  );
}
