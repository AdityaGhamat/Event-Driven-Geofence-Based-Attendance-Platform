import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { loginSchema } from "@/lib/validations/auth";
import { login } from "@/api/auth";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const { refetchUser } = useAuth();

  const handleLogin = async () => {
    const result = loginSchema.safeParse({ email, password });
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
      const res = await login(email, password);
      if (res.success && res.authorization) {
        await SecureStore.setItemAsync("access_token", res.authorization);
        if (res.refresh) {
          await SecureStore.setItemAsync("refresh_token", res.refresh);
        }
        await refetchUser();
        router.push("/");
      }
    } catch (error) {
      Alert.alert("Login Failed", "Something went wrong");
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
            <View className="items-center mb-10">
              <Text className="text-white font-bold text-5xl">
                Welcome Back
              </Text>
              <View className="flex-row mt-3">
                <Text className="text-neutral-300 text-lg">
                  Don't have an account?{" "}
                </Text>
                <Link
                  href="/register"
                  className="text-purple-300 font-bold text-lg"
                >
                  Sign Up
                </Link>
              </View>
            </View>

            <View className="w-full">
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
                  placeholder="Enter your password"
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
                onPress={handleLogin}
                className="bg-purple-600 py-4 rounded-2xl shadow-lg active:bg-purple-700 shadow-purple-900/20"
              >
                <Text className="text-white text-center font-bold text-xl tracking-wide">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
