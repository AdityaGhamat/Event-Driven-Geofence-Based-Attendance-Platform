import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Lock, Eye, EyeOff, KeyRound } from "lucide-react-native";
import { useRouter } from "expo-router";
import { updatePasswordSchema } from "@/lib/validations/auth";
import { notify } from "@/components/ui/notify";
import { updatePassword } from "@/api/auth";

const ChangePassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState<Record<string, string>>();

  const handleUpdate = async () => {
    const { current: old_password, new: new_password, confirm } = form;

    // 1. Check mismatch
    if (new_password !== confirm) {
      notify.error(
        "Password Mismatch",
        "New password and confirm password do not match"
      );
      return;
    }

    // 2. Validate Schema
    const result = updatePasswordSchema.safeParse({
      old_password,
      new_password,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setError(fieldErrors);
      return;
    }

    // 3. API Call
    setLoading(true);
    try {
      const res = await updatePassword({
        old_password: result.data.old_password,
        new_password: result.data.new_password,
      });

      if (res.success) {
        notify.success("Success", "Password updated successfully.");
        setForm({
          current: "",
          new: "",
          confirm: "",
        });
        router.back();
      } else {
        notify.error(
          "Failed",
          res.errors?.message || "Could not update password"
        );
      }
    } catch (error) {
      notify.error("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#2b2538]"
    >
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View className="items-center mb-8 mt-4">
          <View className="w-20 h-20 bg-purple-500/10 rounded-full items-center justify-center border border-purple-500/20 mb-4 shadow-lg shadow-purple-500/10">
            <KeyRound size={32} color="#d8b4fe" />
          </View>
          <Text className="text-white text-2xl font-bold">Update Password</Text>
          <Text className="text-neutral-400 text-center mt-2 px-6">
            Ensure your account stays secure by setting a strong new password.
          </Text>
        </View>

        <View className="gap-y-6">
          <View>
            <Text className="text-neutral-300 mb-2 font-medium ml-1">
              Current Password
            </Text>
            <View className="relative">
              <TextInput
                value={form.current}
                onChangeText={(t) => setForm({ ...form, current: t })}
                placeholder="Enter current password"
                placeholderTextColor="#6b7280"
                secureTextEntry={!show.current}
                className="w-full bg-[#1f1a2e] border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white text-base focus:border-purple-500"
              />
              <View className="absolute left-4 top-[18px]">
                <Lock size={18} color="#9ca3af" />
              </View>
              <TouchableOpacity
                onPress={() => setShow({ ...show, current: !show.current })}
                className="absolute right-4 top-[18px]"
              >
                {show.current ? (
                  <Eye size={20} color="#a1a1aa" />
                ) : (
                  <EyeOff size={20} color="#a1a1aa" />
                )}
              </TouchableOpacity>
            </View>
            {error?.old_password && (
              <Text className="text-red-400 text-xs mt-1 ml-1">
                {error?.old_password}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-neutral-300 mb-2 font-medium ml-1">
              New Password
            </Text>
            <View className="relative">
              <TextInput
                value={form.new}
                onChangeText={(t) => setForm({ ...form, new: t })}
                placeholder="Enter new password"
                placeholderTextColor="#6b7280"
                secureTextEntry={!show.new}
                className="w-full bg-[#1f1a2e] border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white text-base focus:border-purple-500"
              />
              <View className="absolute left-4 top-[18px]">
                <Lock size={18} color="#9ca3af" />
              </View>
              <TouchableOpacity
                onPress={() => setShow({ ...show, new: !show.new })}
                className="absolute right-4 top-[18px]"
              >
                {show.new ? (
                  <Eye size={20} color="#a1a1aa" />
                ) : (
                  <EyeOff size={20} color="#a1a1aa" />
                )}
              </TouchableOpacity>
            </View>

            {error?.new_password && (
              <Text className="text-red-400 text-xs mt-1 ml-1">
                {error?.new_password}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-neutral-300 mb-2 font-medium ml-1">
              Confirm New Password
            </Text>
            <View className="relative">
              <TextInput
                value={form.confirm}
                onChangeText={(t) => setForm({ ...form, confirm: t })}
                placeholder="Confirm new password"
                placeholderTextColor="#6b7280"
                secureTextEntry={!show.confirm}
                className="w-full bg-[#1f1a2e] border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white text-base focus:border-purple-500"
              />
              <View className="absolute left-4 top-[18px]">
                <Lock size={18} color="#9ca3af" />
              </View>
              <TouchableOpacity
                onPress={() => setShow({ ...show, confirm: !show.confirm })}
                className="absolute right-4 top-[18px]"
              >
                {show.confirm ? (
                  <Eye size={20} color="#a1a1aa" />
                ) : (
                  <EyeOff size={20} color="#a1a1aa" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleUpdate}
            disabled={loading}
            className={`w-full py-4 rounded-xl mt-4 items-center justify-center shadow-lg shadow-purple-500/20 ${
              loading ? "bg-purple-800" : "bg-purple-600 active:bg-purple-700"
            }`}
          >
            <Text className="text-white font-bold text-lg tracking-wide">
              {loading ? "Updating..." : "Update Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
