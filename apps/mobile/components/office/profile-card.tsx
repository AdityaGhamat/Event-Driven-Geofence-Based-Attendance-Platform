import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { IProfileCardProps } from "@/types/auth";

const ProfileCard = (props: IProfileCardProps) => {
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

  return (
    // Changed margin-top to 0 because the parent View now handles padding
    <View className="w-full bg-[#3c354d] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header Gradient */}
      <LinearGradient
        colors={["#7e22ce", "#d946ef"]} // Slightly deeper purple gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="h-36 relative" // Made slightly taller (h-36) for better proportions
      >
        <View className="absolute inset-0 bg-black/10" />
      </LinearGradient>

      <View className="px-6 pb-8 relative">
        {/* Avatar - Moved slightly higher (-mt-14) */}
        <View className="items-center -mt-14">
          <View className="w-28 h-28 rounded-full border-[6px] border-[#3c354d] bg-white items-center justify-center shadow-lg elevation-5">
            {/* Increased Font Size for Initials */}
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
          {/* Info Rows */}
          <InfoRow icon="mail" label="Email Address" value={props.email} />

          <InfoRow
            icon="business"
            label="Office Location"
            value={props.office ? props.office.name : "Remote"}
          />

          <InfoRow
            icon="card"
            label="Employee ID"
            value={props._id || "N/A"}
            isTruncated
          />
        </View>

        {/* Footer */}
        <View className="mt-8 pt-6 border-t border-white/10 flex-row justify-between items-center">
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
      </View>
    </View>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  isTruncated,
}: {
  icon: any;
  label: string;
  value: string;
  isTruncated?: boolean;
}) => (
  <View className="flex-row items-center gap-4 p-4 rounded-2xl bg-[#2b2538]/50 border border-white/5">
    <View className="p-2.5 bg-purple-500/10 rounded-xl">
      <Ionicons name={icon} size={22} color="#d946ef" />
    </View>
    <View className="flex-1">
      <Text className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-0.5">
        {label}
      </Text>
      <Text
        className="text-white text-sm font-semibold"
        numberOfLines={isTruncated ? 1 : undefined}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    </View>
  </View>
);

export default ProfileCard;
