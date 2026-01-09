import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#2b2538" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: "#2b2538" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="change-password"
        options={{ title: "Change Password" }}
      />
    </Stack>
  );
}
