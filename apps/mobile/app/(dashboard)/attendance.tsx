import {
  ActivityIndicator,
  ScrollView,
  View,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback, useActionState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { generateSlots } from "@/lib/utils/attendnace";
import { getAnalytics } from "@/api/attendance";
import { IAnalyticsResponse } from "@/types/attendance";
import AttendanceCard from "@/components/attendance/attendance-card";
import TodayAttendance from "@/components/attendance/today-attendance";
import WeeklyPerformance from "@/components/attendance/weekly-performance";
import AttendanceSummary from "@/components/attendance/attendance-summary";
import MonthlyOverview from "@/components/attendance/monthly-overview";
import { useAuth } from "@/hooks/useAuth";

const Attendance = () => {
  const { user } = useAuth();
  const [data, setData] = useState<IAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const startTime = user?.office?.workStartTime;
  const endTime = user?.office?.workEndTime;
  const slots = useMemo(() => {
    return generateSlots(startTime as string, endTime as string);
  }, [startTime, endTime]);

  const fetchData = async () => {
    try {
      if (!data) setLoading(true);

      const res = await getAnalytics();
      if (res.success) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Analytics fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  if (loading && !data) {
    return (
      <View className="flex-1 bg-[#2b2538] justify-center items-center">
        <ActivityIndicator size="large" color="#c084fc" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#2b2538]">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#c084fc"
            colors={["#c084fc"]}
            progressBackgroundColor="#3c354d"
          />
        }
      >
        <AttendanceCard>
          <TodayAttendance stats={data?.today} slots={slots} />
        </AttendanceCard>

        <AttendanceCard>
          <AttendanceSummary summary={data?.month.summary} />
        </AttendanceCard>

        <AttendanceCard>
          <WeeklyPerformance
            data={data?.week.daily || []}
            average={data?.week.averageDailyMinutes || 0}
          />
        </AttendanceCard>

        <AttendanceCard>
          <MonthlyOverview monthData={data?.month?.daily || []} />
        </AttendanceCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Attendance;
