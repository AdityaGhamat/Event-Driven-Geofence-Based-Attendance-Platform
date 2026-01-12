import AttendanceCard from "../components/AttendanceCard";
import { generateSlots } from "../utils";
import TodayAttendance from "../components/TodayAttendance";
import WeeklyPerformance from "../components/WeeklyPerformance";
import MonthlyOverview from "../components/MonthlyOverview";
import AttendanceSummary from "../components/AttendanceSummary";
import { useEffect, useState, useMemo } from "react";
import type { IAnalyticsResponse, IAttedanceProps } from "../types";
import { getAnalytics } from "../api";
import Loading from "../../../components/Loading";
import { useAuth } from "../../auth/hooks/useAuth";

const Attendance = ({ employee_id, self = true }: IAttedanceProps) => {
  const { user } = useAuth();
  const startTime = user?.office?.workStartTime as string;
  const endTime = user?.office?.workEndTime as string;
  const slots = useMemo(() => {
    return generateSlots(startTime as string, endTime as string);
  }, []);
  const [data, setData] = useState<IAnalyticsResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res;

        if (self) {
          res = await getAnalytics();
        } else {
          res = await getAnalytics(employee_id);
        }

        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employee_id, self]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <AttendanceCard>
        <TodayAttendance stats={data?.today} slots={slots} />
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
      <AttendanceCard>
        <AttendanceSummary summary={data?.month.summary} />
      </AttendanceCard>
    </div>
  );
};

export default Attendance;
