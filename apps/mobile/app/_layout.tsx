import { Slot } from "expo-router";
import { Toaster } from "sonner-native";
import AuthContextProvider from "@/context/auth/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <Slot />
        <Toaster position="top-center" />
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
