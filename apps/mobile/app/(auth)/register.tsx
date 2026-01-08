import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { createUserSchema } from "@/lib/validations/auth";
import { register } from "@/api/auth";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string>>({});
  const { setUser } = useAuth();
  const router = useRouter();
  const handleRegister = async () => {
    const result = createUserSchema.safeParse({ name, email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setError(fieldErrors);
      return;
    }
    try {
      const res = await register(name, email, password);
      if (res.success && res.authorization) {
        await SecureStore.setItemAsync("access_token", res.authorization);
        if (res.refresh) {
          await SecureStore.setItemAsync("refresh_token", res.refresh);
        }
        setUser(res.data);
        router.push("/");
      }
    } catch (error: any) {
      const message = error.response?.data?.error?.message || "Login failed";
      setError({ form: message });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 justify-center px-6">
          <View className="w-full max-w-md mx-auto self-center">
            <View className="items-center mb-8">
              <Text className="text-white font-bold text-5xl">
                Create Account
              </Text>
              <View className="flex-row mt-3">
                <Text className="text-neutral-300 text-lg">
                  Already have an account?{" "}
                </Text>
                <Link
                  href="/login"
                  className="text-purple-300 font-bold text-lg"
                >
                  Login
                </Link>
              </View>
            </View>

            <View className="w-full">
              <View className="mb-5">
                <Text className="text-neutral-300 mb-2 ml-1 font-medium">
                  Full Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="words"
                  className={`w-full bg-[#2a253b]/80 border rounded-2xl py-4 pl-5 pr-4 text-white text-lg focus:border-purple-400 ${
                    error.name ? "border-red-400" : "border-gray-600"
                  }`}
                />
                {error.name && (
                  <Text className="text-red-400 mt-1 text-sm ml-1">
                    {error.name}
                  </Text>
                )}
              </View>

              <View className="mb-5">
                <Text className="text-neutral-300 mb-2 ml-1 font-medium">
                  Email Address
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="name@example.com"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className={`w-full bg-[#2a253b]/80 border rounded-2xl py-4 pl-5 pr-4 text-white text-lg focus:border-purple-400 ${
                    error.email ? "border-red-400" : "border-gray-600"
                  }`}
                />
                {error.email && (
                  <Text className="text-red-400 mt-1 text-sm ml-1">
                    {error.email}
                  </Text>
                )}
              </View>

              <View className="relative mb-6">
                <Text className="text-neutral-300 mb-2 ml-1 font-medium">
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  className={`w-full bg-[#2a253b]/80 border rounded-2xl py-4 pl-5 pr-12 text-white text-lg focus:border-purple-400 ${
                    error.password ? "border-red-400" : "border-gray-600"
                  }`}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[42px]"
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={22}
                    color="#a3a3a3"
                  />
                </TouchableOpacity>
                {error.password && (
                  <Text className="text-red-400 mt-1 text-sm ml-1">
                    {error.password}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleRegister}
                className="bg-purple-600 py-4 rounded-2xl shadow-lg active:bg-purple-700 shadow-purple-900/20 mt-2"
              >
                <Text className="text-white text-center font-bold text-xl tracking-wide">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
