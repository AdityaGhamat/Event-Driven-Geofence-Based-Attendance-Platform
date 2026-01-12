import { Queue } from "bullmq";
import bullmqConnection from "./client";

export const scheduleQueue = new Queue("schedule-queue", {
  connection: bullmqConnection,
});

export const aggregationQueue = new Queue("aggregation-queue", {
  connection: bullmqConnection,
});
