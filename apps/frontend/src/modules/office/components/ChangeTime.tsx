import { type ChangeEvent } from "react";
import type { IChangeTimeProps } from "../types";

const ChangeTime = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  setHasChanges,
}: IChangeTimeProps) => {
  return (
    <div className="grid grid-cols-2 gap-10 mt-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="startTime" className="text-white font-medium pl-1">
          Start Time
        </label>
        <input
          type="time"
          name="startTime"
          id="startTime"
          className="
            w-full text-white px-4 py-2 
            bg-[#2b2538] border border-purple-300/50 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-purple-500 
            transition-all
            [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert
          "
          value={startTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStartTime(e.target.value);
            setHasChanges(true);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="endTime" className="text-white font-medium pl-1">
          End Time
        </label>
        <input
          type="time"
          name="endTime"
          id="endTime"
          className="
            w-full text-white px-4 py-2 
            bg-[#2b2538] border border-purple-300/50 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-purple-500 
            transition-all
            [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert
          "
          value={endTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEndTime(e.target.value);
            setHasChanges(true);
          }}
        />
      </div>
    </div>
  );
};

export default ChangeTime;
