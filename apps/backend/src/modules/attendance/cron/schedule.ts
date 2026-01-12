import { scheduleQueue } from "../../core/queues/queues";

export async function initSchedule() {
  await scheduleQueue.obliterate({ force: true });
  await scheduleQueue.add(
    "trigger-attendance-check",
    {},
    { repeat: { pattern: "*/15 * * * *" }, jobId: "office-pulse-id" }
  );
  console.log("✅ Scheduler Initialized");
}
