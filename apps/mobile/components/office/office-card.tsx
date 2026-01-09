import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Building, ArrowRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { joinOffice } from "@/api/office";
import { notify } from "../ui/notify";
import { useAuth } from "@/hooks/useAuth";

interface OfficeCardProps {
  _id: string;
  name: string;
}

const OfficeCard = ({ _id, name }: OfficeCardProps) => {
  const [loading, setLoading] = useState(false);
  const { refetchUser } = useAuth();
  const router = useRouter();

  const handleJoinOffice = async () => {
    setLoading(true);
    try {
      const res = await joinOffice(_id);
      if (res.success) {
        await refetchUser();
        notify.success("Joined!", `You successfully joined ${name}`);
        router.replace("/(dashboard)");
      } else {
        notify.error("Error", res.message || "Failed to join office");
      }
    } catch (error: any) {
      notify.error("Error", error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-[#3c354d] border border-purple-500/30 rounded-xl p-4 shadow-sm mb-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          <View className="w-12 h-12 rounded-full bg-purple-500/10 items-center justify-center border border-purple-500/20">
            <Building size={24} color="#d8b4fe" />
          </View>

          <View className="flex-1 justify-center">
            <Text className="text-white font-bold text-lg" numberOfLines={1}>
              {name}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={handleJoinOffice}
          disabled={loading}
          className={`
            flex-row items-center gap-2 px-4 py-2 rounded-lg ml-3
            ${loading ? "bg-purple-500/20" : "bg-purple-600 active:bg-purple-700"}
          `}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text className="text-white font-semibold text-sm">Join</Text>
              <ArrowRight size={14} color="#fff" />
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default OfficeCard;
