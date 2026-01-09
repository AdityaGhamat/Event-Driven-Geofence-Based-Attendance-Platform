export interface Slot {
  id: number;
  start: string;
  end: string;
  status: string;
}
export interface IDailyRecord {
  date: string;
  workingMinutes: number;
  status: "PRESENT" | "ABSENT" | "HALF" | null;
  activeSlots?: string[];
}

export interface IAnalyticsResponse {
  today: IDailyRecord | null;
  week: {
    daily: IDailyRecord[];
    averageDailyMinutes: number;
  };
  month: {
    daily: IDailyRecord[];
    summary: {
      presentDays: number;
      absentDays: number;
      attendanceRate: number;
    };
  };
}
export interface TodayAttendanceProps {
  slots: any[];
  stats: IDailyRecord | null | undefined;
}

export interface WeeklyPerformanceProps {
  data: IDailyRecord[];
  average: number;
}

export interface MonthlyOverviewProps {
  monthData?: IDailyRecord[];
}

export interface AttendanceSummaryProps {
  summary?: {
    presentDays: number;
    absentDays: number;
    attendanceRate: number;
  };
}

export interface IAttedanceProps {
  employee_id?: string;
  self?: boolean;
}
