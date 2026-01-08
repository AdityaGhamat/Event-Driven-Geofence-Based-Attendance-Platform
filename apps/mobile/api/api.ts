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
    console.log("🟣 API RESPONSE", response.config.url);
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      console.log("🔴 API ERROR", error.config?.url, error.response?.status);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
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
        if (!refreshToken) throw new Error("No refresh token");

        const response = await axios.get(`${BASE_URL}/api/auth/refresh`, {
          params: {
            token: refreshToken,
          },
        });

        const { authorization, refresh } = response.data;

        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, authorization);
        if (refresh) {
          await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh);
        }

        isRefreshing = false;
        onRefreshed(authorization);

        originalRequest.headers.Authorization = `Bearer ${authorization}`;
        return api(originalRequest);
      } catch (err) {
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
