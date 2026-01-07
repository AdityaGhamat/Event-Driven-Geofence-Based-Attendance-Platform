import { CalendarCheck, Save, RotateCcw } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import type { DayNumberFirstAlphabet } from "../constants/days";
import { useState, useEffect } from "react";
import { changeWorkingDays, changeWorkingTime } from "../api";
import ChangeTime from "./ChangeTime";
import WorkingDaysSelector from "./WorkingDaysSelector";

const OfficeSettingsLower = () => {
  const { user, refetchUser } = useAuth();

  const [selectedDays, setSelectedDays] = useState<DayNumberFirstAlphabet[]>(
    []
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  useEffect(() => {
    if (
      user?.office?.workingDays &&
      user?.office?.workStartTime &&
      user?.office?.workEndTime
    ) {
      const savedDays = user.office.workingDays as DayNumberFirstAlphabet[];
      const savedStartTime = user.office.workStartTime as string;
      const savedEndTime = user.office.workEndTime as string;
      setStartTime(savedStartTime);
      setEndTime(savedEndTime);
      setSelectedDays(savedDays);
    }
  }, [user]);

  const canEdit = user?.role === "admin" || user?.role === "super_admin";
  const toggleDay = (day: DayNumberFirstAlphabet) => {
    if (!canEdit) return;
    let newDays;
    if (selectedDays.includes(day)) {
      newDays = selectedDays.filter((d) => d !== day);
    } else {
      newDays = [...selectedDays, day].sort((a, b) => a - b);
    }
    setSelectedDays(newDays);
    setHasChanges(true);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const [res1, res2] = await Promise.all([
        changeWorkingDays(selectedDays),
        changeWorkingTime(startTime, endTime),
      ]);
      if (res1.success && res2.success) {
        await refetchUser();
        setHasChanges(false);
        alert("Schedule updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update schedule", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (user?.office?.workingDays) {
      setSelectedDays(user.office.workingDays as DayNumberFirstAlphabet[]);
      setStartTime(user.office.workStartTime || "");
      setEndTime(user.office.workEndTime || "");
      setHasChanges(false);
    }
  };

  return (
    <div className="bg-[#3c354d] p-6 rounded-xl border border-purple-400/30 space-y-7">
      <div className="flex justify-between items-start">
        <div className="text-white flex flex-col">
          <span className="flex items-center gap-x-2 text-lg font-semibold">
            <CalendarCheck className="text-purple-400 w-5 h-5" />
            Working Schedule
          </span>
          <span className="text-sm text-neutral-400 mt-1">
            {canEdit ? "Click days to toggle availability" : "View-only mode"}
          </span>
        </div>

        {hasChanges && (
          <div className="flex gap-2 animate-in fade-in slide-in-from-right-4">
            <button
              onClick={handleReset}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Undo changes"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="
                flex items-center gap-2 px-4 py-2 
                bg-purple-500 text-white font-semibold rounded-lg 
                hover:bg-purple-600 transition-all 
                shadow-[0_0_15px_rgba(168,85,247,0.3)]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
      <WorkingDaysSelector
        canEdit={canEdit}
        onToggle={toggleDay}
        selectedDays={selectedDays}
      />
      <div>
        <ChangeTime
          hasChanges={hasChanges}
          setHasChanges={setHasChanges}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
      </div>
    </div>
  );
};

export default OfficeSettingsLower;
