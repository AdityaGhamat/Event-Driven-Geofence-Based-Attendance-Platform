import { z } from "zod";
const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
export const updateWorkingTimeSchema = z
  .object({
    workStartTime: z
      .string()
      .regex(timeRegex, "Invalid format.Use HH:MM (e.g., 09:00 or 17:30)"),
    workEndTime: z
      .string()
      .regex(timeRegex, "Invalid format.Use HH:MM (e.g., 09:00 or 17:30)"),
  })
  .refine((data) => data.workStartTime < data.workEndTime, {
    message: "Start time must be earlier than end time",
    path: ["workStartTime"],
  });

export const createOfficeSchema = z.object({
  name: z
    .string()
    .min(5, "Minimum 5 Characters Required")
    .max(100, "Maximum 100 Characters Are Permitted"),
  workingDays: z
    .array(z.number().int().min(1).max(6))
    .min(1)
    .max(7)
    .refine((days) => new Set(days).size === days.length, {
      message: "workingDays must contain unique days",
    }),
  coordinates: z.array(z.number()),
  workStartTime: z
    .string()
    .regex(timeRegex, "Invalid format.Use HH:MM (e.g., 09:00 or 17:30)"),
  workEndTime: z
    .string()
    .regex(timeRegex, "Invalid format.Use HH:MM (e.g., 09:00 or 17:30)"),
  geofence_radius: z
    .number()
    .min(10, "minimum 10 meters required")
    .max(100, "can't exceed 100 meters for now"),
});
