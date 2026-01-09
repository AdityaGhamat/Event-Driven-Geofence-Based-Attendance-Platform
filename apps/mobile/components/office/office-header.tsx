import { Pressable, Text, View, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Building, LogOut } from "lucide-react-native";
import { leaveOffice } from "@/api/office";
import { notify } from "../ui/notify";
import { confirmToast } from "../ui/confirm";

const OfficeHeader = () => {
  const { user, refetchUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const performLeaveOffice = async () => {
    if (!user?.office?._id) return;

    setLoading(true);
    try {
      const res = await leaveOffice(user.office._id);

      if (res.success) {
        notify.success("Left Office", "You have successfully left the office.");
        await refetchUser();
      } else {
        notify.error("Action Failed", res.message || "Could not leave office.");
      }
    } catch (error: any) {
      notify.error("Error", error.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveOffice = () => {
    confirmToast(
      "You will lose access to attendance records.",
      performLeaveOffice,
      "Leave Office?"
    );
  };

  return (
    <View className="bg-[#3b344c] p-3 rounded-lg border border-purple-400/50 shadow-sm">
      <View className="flex flex-row gap-x-3 items-center">
        <View className="w-12 h-12 bg-white rounded-full items-center justify-center border border-gray-600">
          <Building size={24} color="#e879f9" />
        </View>

        <View className="flex-1">
          <Text
            className="text-white text-xl font-bold flex-wrap"
            numberOfLines={1}
          >
            {user?.office?.name || "Office Name"}
          </Text>

          <Text className="text-xs text-gray-300" numberOfLines={1}>
            ID: {user?.office?._id || "N/A"}
          </Text>
        </View>

        <Pressable
          onPress={handleLeaveOffice}
          disabled={loading}
          className={`p-2 rounded-lg border active:bg-red-500/20 
            ${loading ? "bg-red-500/5 border-red-500/10" : "bg-red-500/10 border-red-500/20"}`}
        >
          {loading ? (
            <ActivityIndicator size={20} color="#ef4444" />
          ) : (
            <LogOut size={20} color="#ef4444" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default OfficeHeader;
