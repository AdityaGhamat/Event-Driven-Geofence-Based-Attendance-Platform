import { Worker, Job } from "bullmq";
import bullmqConnection from "../../core/queues/client";
import UserModel from "../../auth/document/auth.document";
import DailyAttendanceModel from "../document/dailyattendance.document";
import { aggregateForUser } from "../jobs/dailyattendance.job";

export const aggregationWorker = new Worker(
  "aggregation-queue",
  async (job: Job) => {
    if (job.name === "aggregate-daily") {
      const { officeId, dateStr, startTime, endTime } = job.data;
      const existing = await DailyAttendanceModel.findOne({
        office: officeId,
        date: dateStr,
      });
      if (existing) return;
      console.log(`📊 Aggregating: ${officeId}`);
      const users = await UserModel.find({
        office: officeId,
      }).lean();
      for (const user of users) {
        await aggregateForUser(user._id, officeId, dateStr, startTime, endTime);
      }
    }
  },
  {
    connection: bullmqConnection,
    autorun: false,
  }
);
