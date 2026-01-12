import { Worker, Job } from "bullmq";
import bullmqConnection from "../../core/queues/client";
import OfficeModel from "../../office/document/office.document";
import { processOfficeAttendance } from "../jobs/attendanceslot.job";
import { aggregationQueue } from "../../core/queues/queues";
import { timeToMinutes as toMinutes } from "../utilities";

export const scheduleWorker = new Worker(
  "schedule-queue",
  async (job: Job) => {
    if (job.name === "trigger-attendance-check") {
      console.log(`[${new Date().toISOString()}] 💓 Pulse received.`);
      const offices = await OfficeModel.find({ isActive: true }).lean();
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const todayWeekDay = now.getDay();

      for (const office of offices) {
        if (!office.workingDays?.includes(todayWeekDay)) continue;
        const startMinutes = toMinutes(office.workStartTime);
        const endMinutes = toMinutes(office.workEndTime);
        if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
          await processOfficeAttendance(office);
        } else if (
          currentMinutes > endMinutes &&
          currentMinutes <= endMinutes + 15
        ) {
          console.log(`🏁 ${office.name} Closed. Triggering Report.`);
          await aggregationQueue.add("aggregate-daily", {
            officeId: office._id,
            dateStr: now.toISOString().split("T")[0],
            startTime: office.workStartTime,
            endTime: office.workEndTime,
          });
        }
      }
    }
  },
  {
    connection: bullmqConnection,
    autorun: false,
  }
);
