import OfficeModel from "../../office/document/office.document";
import AttendanceModel from "../document/attendanceslot.document";
import UserModel from "../../auth/document/auth.document";
import client from "../config/redis.config";
import { getCurrentSlot, getTodayDate, haversine } from "../utilities";
import { aggregateForUser } from "./dailyattendance.job";

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
export async function processOfficeAttendance(office: any) {
  const users = await UserModel.find({
    office: office._id,
  }).lean();

  console.log(`Found ${users.length} active users for office: ${office.name}`);
  if (users.length === 0) return;

  const slotTime = getCurrentSlot();
  const date = getTodayDate();
  const slots: any[] = [];

  const pipeline = client.pipeline();
  users.forEach((u: any) => pipeline.get(`location:${office._id}:${u._id}`));
  const results = await pipeline.exec();

  users.forEach((user, index) => {
    const raw = results![index][1] as string | null;
    let status: "IN" | "OUT" | "NO_DATA" = "NO_DATA";

    if (raw) {
      const parsed = JSON.parse(raw);
      const lat = parsed.lat || parsed.latitude;
      const lng = parsed.lng || parsed.longitude;

      if (lat && lng) {
        const distance = haversine(
          lat,
          lng,
          office.coordinates[0],
          office.coordinates[1]
        );
        status = distance <= office?.geofence_radius ? "IN" : "OUT";
      }
    }

    slots.push({
      user: user._id,
      office: office._id,
      date,
      slotTime,
      status,
    });
  });

  if (slots.length > 0) {
    try {
      // 1. Insert the raw 15-min slots
      await AttendanceModel.insertMany(slots, { ordered: false });

      // 2. 🔥 REAL-TIME AGGREGATION 🔥
      // Immediately calculate the total day's progress for these users
      console.log(`⚡ Updating daily stats for ${users.length} users...`);

      await Promise.all(
        users.map((user) =>
          aggregateForUser(
            user._id,
            office._id,
            date,
            office.workStartTime,
            office.workEndTime
          )
        )
      );
    } catch (err: any) {
      console.error("Partial failure in attendance processing:", err.message);
    }
  }
}

export async function markAttendanceJob(force: boolean = false) {
  console.log(
    `[${new Date().toISOString()}] Smart attendance job started (Force: ${force})`
  );

  try {
    const offices = await OfficeModel.find({ isActive: true }).lean();
    if (offices.length === 0) return;

    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const istOffset = 5.5 * 60 * 60 * 1000;
    const localDate = new Date(utc + istOffset);

    const todayWeekday = localDate.getDay();
    const currentMinutes = localDate.getHours() * 60 + localDate.getMinutes();

    let processedOffices = 0;

    for (const office of offices) {
      if (!force) {
        if (!office.workingDays || !office.workingDays.includes(todayWeekday)) {
          continue;
        }

        const startMinutes = toMinutes(office.workStartTime || "09:00");
        const endMinutes = toMinutes(office.workEndTime || "18:00");

        if (currentMinutes < startMinutes || currentMinutes > endMinutes) {
          continue;
        }
      }

      await processOfficeAttendance(office);
      processedOffices++;
    }
    console.log(`Job completed. Processed ${processedOffices} office(s).`);
  } catch (error) {
    console.error("Attendance job failed critically:", error);
  }
}
