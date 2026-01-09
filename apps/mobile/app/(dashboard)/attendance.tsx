import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  InteractionManager,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { generateSlots } from "@/lib/utils/attendnace";
import { getAnalytics } from "@/api/attendance";
import { IAnalyticsResponse } from "@/types/attendance";
import AttendanceCard from "@/components/attendance/attendance-card";
import TodayAttendance from "@/components/attendance/today-attendance";
import WeeklyPerformance from "@/components/attendance/weekly-performance";
import AttendanceSummary from "@/components/attendance/attendance-summary";
import MonthlyOverview from "@/components/attendance/monthly-overview";

const Attendance = () => {
  const [data, setData] = useState<IAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const slots = generateSlots();

  useEffect(() => {
    setIsReady(true);
    const fetchData = async () => {
      try {
        const res = await getAnalytics();
        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Analytics fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
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
