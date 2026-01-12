import { Types } from "mongoose";
import { Request, Response } from "express";
import { markAttendanceJob } from "./jobs/attendanceslot.job";
import { getTodayDate } from "./utilities";
import DailyAttendanceModel from "./document/dailyattendance.document";
import AttendanceModel from "./document/attendanceslot.document";
import { sendApiResponse } from "../core/response/apiResponse";

class AttendanceController {
  public async manualMarkAttendance(req: Request, res: Response) {
    try {
      await markAttendanceJob(true);
      return sendApiResponse(res, 200, {
        message: "Manual attendance marking completed successfully",
      });
    } catch (error) {
      console.error("Manual attendance marking failed:", error);
      return sendApiResponse(res, 500, {
        errors: { message: "Failed to mark attendance manually" },
      });
    }
  }

  private calculateActiveSlots(events: any[]): string[] {
    if (!events || events.length === 0) return [];
    const activeSlots = new Set<string>();
    events.forEach((event) => {
      if (event.type === "IN" || event.type === "PING") {
        const date = new Date(event.timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const roundedMinutes = Math.floor(minutes / 15) * 15;
        const timeString = `${hours}:${
          roundedMinutes === 0 ? "00" : roundedMinutes
        }`;
        activeSlots.add(timeString);
      }
    });
    return Array.from(activeSlots);
  }

  // authmiddleware
  public async userAnalytics(req: Request, res: Response) {
    try {
      const userId = new Types.ObjectId(req.user.user_id);
      const todayDateStr = getTodayDate();
      const now = new Date();

      const dayOfWeek = now.getDay();
      const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - mondayOffset);
      const weekStartStr = getTodayDate(weekStart);

      const monthStartStr = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-01`;

      const stats = await DailyAttendanceModel.aggregate([
        {
          $match: {
            user: userId,
            date: { $gte: monthStartStr, $lte: todayDateStr },
          },
        },
        {
          $facet: {
            today: [
              { $match: { date: todayDateStr } },
              { $project: { _id: 0, workingMinutes: 1, status: 1, date: 1 } },
            ],
            weekStats: [
              { $match: { date: { $gte: weekStartStr } } },
              {
                $group: {
                  _id: null,
                  totalMinutes: { $sum: { $toInt: "$workingMinutes" } },
                  presentDays: {
                    $sum: { $cond: [{ $eq: ["$status", "PRESENT"] }, 1, 0] },
                  },
                  absentDays: {
                    $sum: { $cond: [{ $eq: ["$status", "ABSENT"] }, 1, 0] },
                  },
                  totalDays: { $sum: 1 },
                },
              },
            ],
            monthStats: [
              {
                $group: {
                  _id: null,
                  totalMinutes: { $sum: "$workingMinutes" },
                  presentDays: {
                    $sum: { $cond: [{ $eq: ["$status", "PRESENT"] }, 1, 0] },
                  },
                  absentDays: {
                    $sum: { $cond: [{ $eq: ["$status", "ABSENT"] }, 1, 0] },
                  },
                  totalDays: { $sum: 1 },
                },
              },
            ],
          },
        },
      ]);

      const data = stats[0];
      const week = data.weekStats[0] || {
        totalMinutes: 0,
        presentDays: 0,
        absentDays: 0,
        totalDays: 0,
      };
      const month = data.monthStats[0] || {
        totalMinutes: 0,
        presentDays: 0,
        absentDays: 0,
        totalDays: 0,
      };

      const resObject = {
        today: data.today[0] || null,
        week: {
          totalWorkingMinutes: week.totalMinutes,
          averageDailyMinutes:
            week.totalDays > 0
              ? Math.round(week.totalMinutes / week.totalDays)
              : 0,
          presentDays: week.presentDays,
          absentDays: week.absentDays,
        },
        month: {
          totalWorkingMinutes: month.totalMinutes,
          presentDays: month.presentDays,
          absentDays: month.absentDays,
          attendancePercentage:
            month.totalDays > 0
              ? Math.round((month.presentDays / month.totalDays) * 100)
              : 0,
        },
      };

      return sendApiResponse(res, 200, {
        data: resObject,
        message: "Analytics fetched successfully",
      });
    } catch (error) {
      console.error("Analytics Error:", error);
      return sendApiResponse(res, 500, {
        errors: { message: "Internal server error" },
      });
    }
  }

  // authmiddleware
  private calculateTodayStats(rawSlots: any[]) {
    const presentSlots = rawSlots.filter((s) => s.status === "IN");
    const activeSlots = presentSlots.map((s) => s.slotTime);
    const workingMinutes = presentSlots.length * 15;

    // Simple logic for live status
    let status = "ABSENT";
    if (workingMinutes > 0) status = "PRESENT";

    return {
      workingMinutes,
      status,
      activeSlots,
      date: getTodayDate(),
    };
  }

  public userDashboard = async (req: Request, res: Response) => {
    try {
      let userId;
      const uid = req.query.uid as string;
      if (uid) {
        userId = new Types.ObjectId(uid);
      } else {
        userId = new Types.ObjectId(req.user.user_id);
      }

      const todayDateStr = getTodayDate();
      const now = new Date();

      const dayOfWeek = now.getDay();
      const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - mondayOffset);
      const weekStartStr = getTodayDate(weekStart);
      const monthStartStr = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-01`;

      const [historyStats, todayRawSlots] = await Promise.all([
        DailyAttendanceModel.aggregate([
          {
            $match: {
              user: userId,
              date: {
                $gte: monthStartStr,
                $ne: todayDateStr,
              },
            },
          },
          {
            $facet: {
              monthDaily: [
                { $project: { _id: 0, date: 1, status: 1, workingMinutes: 1 } },
              ],
              weekStats: [
                { $match: { date: { $gte: weekStartStr } } },
                { $sort: { date: 1 } },
                { $project: { _id: 0, date: 1, workingMinutes: 1, status: 1 } },
              ],
            },
          },
        ]),

        AttendanceModel.find({
          user: userId,
          date: todayDateStr,
        }).lean(),
      ]);

      const data = historyStats[0];
      const weekData = data.weekStats || [];
      const monthData = data.monthDaily || [];

      const todayData = this.calculateTodayStats(todayRawSlots);

      if (todayData.workingMinutes > 0) {
        weekData.push({
          date: todayDateStr,
          workingMinutes: todayData.workingMinutes,
          status: todayData.status,
        });
        monthData.push({
          date: todayDateStr,
          workingMinutes: todayData.workingMinutes,
          status: todayData.status,
        });
      }

      const totalMonthDays = monthData.length;
      const presentMonthDays = monthData.filter(
        (d: any) => d.status === "PRESENT" || d.status === "HALF_PRESENT"
      ).length;
      const absentMonthDays = monthData.filter(
        (d: any) => d.status === "ABSENT"
      ).length;

      const resObject = {
        today: todayData,
        week: {
          daily: weekData,
          averageDailyMinutes:
            weekData.length > 0
              ? Math.round(
                  weekData.reduce(
                    (acc: number, curr: any) =>
                      acc + (curr.workingMinutes || 0),
                    0
                  ) / weekData.length
                )
              : 0,
        },
        month: {
          daily: monthData,
          summary: {
            presentDays: presentMonthDays,
            absentDays: absentMonthDays,
            attendanceRate:
              totalMonthDays > 0
                ? Math.round((presentMonthDays / totalMonthDays) * 100)
                : 0,
          },
        },
      };

      return sendApiResponse(res, 200, {
        data: resObject,
        message: "Dashboard analytics fetched successfully",
      });
    } catch (error) {
      console.error("Dashboard Error:", error);
      return sendApiResponse(res, 500, {
        errors: { message: "Internal server error" },
      });
    }
  };
}
export default new AttendanceController();
