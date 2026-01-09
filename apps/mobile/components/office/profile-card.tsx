import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { IProfileCardProps } from "@/types/auth";
import { Settings, LogOut } from "lucide-react-native";
import InfoRow from "./info-row";
import { useRouter } from "expo-router";
import { logOut } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import * as SecureStore from "expo-secure-store";

const ProfileCard = (props: IProfileCardProps) => {
  const router = useRouter();
  const { refetchUser } = useAuth();

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatRole = (role: string) => {
    return role?.replace("_", " ").toUpperCase();
  };

  const handleLogout = async () => {
    const res = await logOut();
    if (res.success) {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
    }

    await refetchUser();
    router.replace("/(auth)/login");
  };

  return (
    <View className="w-full bg-[#3c354d] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl mb-6">
      <LinearGradient
        colors={["#7e22ce", "#d946ef"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="h-36 relative"
      >
        <View className="absolute inset-0 bg-black/10" />

        <TouchableOpacity
          onPress={() => router.push("/(dashboard)/profile/change-password")}
          className="absolute top-4 right-4 p-2.5 bg-black/20 rounded-full border border-white/10 active:bg-black/40"
        >
          <Settings size={20} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <View className="px-6 pb-8 relative">
        <View className="items-center -mt-14">
          <View className="w-28 h-28 rounded-full border-[6px] border-[#3c354d] bg-white items-center justify-center shadow-lg elevation-5">
            <Text className="text-purple-600 text-4xl font-extrabold">
              {getInitials(props.name)}
            </Text>
          </View>

          <Text className="mt-3 text-2xl font-bold text-white tracking-wide">
            {props.name}
          </Text>

          <View className="mt-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/50 flex-row items-center gap-1.5">
            <Ionicons name="shield-checkmark" size={14} color="#d8b4fe" />
            <Text className="text-purple-300 text-[10px] font-bold uppercase tracking-widest">
              {formatRole(props.role)}
            </Text>
          </View>
        </View>

        <View className="mt-8 gap-y-4">
          <InfoRow icon="mail" label="Email Address" value={props.email} />

          <InfoRow
            icon="business"
            label="Office Location"
            value={props.office ? props.office.name : "No Office"}
          />

          <InfoRow
            icon="card"
            label="Employee ID"
            value={props._id || "N/A"}
            isTruncated
          />
        </View>

        <View className="mt-8 pt-6 border-t border-white/10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white/40 text-xs font-medium tracking-wide">
              Account Status
            </Text>
            <View className="flex-row items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <View className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <Text className="text-emerald-400 text-xs font-bold uppercase">
                Active
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-center gap-2 py-3 bg-red-500/10 rounded-xl border border-red-500/20 active:bg-red-500/20"
          >
            <LogOut size={16} color="#f87171" />
            <Text className="text-red-400 font-bold text-sm">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
