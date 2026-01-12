import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://2381f3699175.ngrok-free.app";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // console.log("🟣 API RESPONSE", response.config.url); // Optional: Uncomment for noise
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    // 1. Avoid infinite loops: Don't refresh if the failed call was ALREADY a login/refresh attempt
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      console.log("🔴 Auth Endpoint Failed:", error.config?.url);
      return Promise.reject(error);
    }

    // 2. Handle 401 Unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("🔄 Token Expired. Queueing Refresh...");

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        if (!refreshToken) {
          console.error("❌ No Refresh Token found locally.");
          throw new Error("No refresh token");
        }

        console.log("🚀 Calling Refresh API...");
        const response = await axios.get(`${BASE_URL}/api/auth/refresh`, {
          params: { token: refreshToken },
        });

        // ⚠️ CRITICAL FIX: Safe Data Extraction
        // This checks both "response.data.authorization" AND "response.data.data.authorization"
        const newAccessToken =
          response.data?.authorization ||
          response.data?.data?.authorization ||
          response.data?.accessToken;
        const newRefreshToken =
          response.data?.refresh ||
          response.data?.data?.refresh ||
          response.data?.refreshToken;

        if (!newAccessToken) {
          console.error(
            "❌ Refresh API succeeded but returned NO token. Response:",
            response.data
          );
          throw new Error("Invalid Refresh Response");
        }

        console.log("✅ Token Refreshed Successfully!");

        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);
        if (newRefreshToken) {
          await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken);
        }

        isRefreshing = false;
        onRefreshed(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("💀 Refresh Cycle Failed. Logging user out.", err);
        isRefreshing = false;
        refreshSubscribers = [];

        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        router.replace("/(auth)/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
