import { View, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import ProfileCard from "@/components/office/profile-card";
import { useAuth } from "@/hooks/useAuth";
import { IUser } from "@/types/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <ActivityIndicator size="large" color="#d946ef" />;

  return (
    <View className="flex-1 bg-[#2d283e]">
      <SafeAreaView edges={["top"]} className="flex-1">
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <ProfileCard {...(user as IUser)} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
