import { useState } from "react";
import type { DayNumberFirstAlphabet } from "../constants/days";
import WorkingDaysSelector from "../components/WorkingDaysSelector";
import { createOfficeSchema } from "../validations";
import { createOffice } from "../api";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import { notify } from "../../../components/Toast";
const CreateOffice = () => {
  const { refetchUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<DayNumberFirstAlphabet[]>(
    []
  );
  const [lat, setLat] = useState<number | undefined>();
  const [long, setLong] = useState<number | undefined>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [radius, setRadius] = useState<number | undefined>();
  const [error, setError] = useState<Record<string, string>>({});

  const toggleDays = (day: DayNumberFirstAlphabet) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day].sort((a, b) => a - b);
      }
    });
  };

  const handleCreateOffice = async () => {
    const result = createOfficeSchema.safeParse({
      name,
      workingDays: selectedDays,
      coordinates: [lat, long],
      workStartTime: startTime,
      workEndTime: endTime,
      geofence_radius: radius,
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          fieldErrors[field] = issue.message;
        }
      });
      setError(fieldErrors);
      console.log(fieldErrors);
      return;
    }
    try {
      setError({});
      const res = await createOffice(result?.data);
      if (res.success) {
        notify.success(
          "Office Created",
          "Your new workspace is ready for action."
        );
        await refetchUser();
        navigate("/dashboard/office");
      }
    } catch (error: any) {
      const message = error.response?.data?.error?.message || "Login failed";
      setError({ form: message });
    }
  };
  const ErrorMsg = ({ msg }: { msg?: string }) => {
    if (!msg) return null;
    return <p className="text-red-400 text-xs mt-1 ml-1">{msg}</p>;
  };

  return (
    <div className="p-10 flex flex-col justify-center min-h-screen w-full items-center border-white/10">
      <title>Create Office | Attendify</title>
      <meta
        name="description"
        content="Create office of your Attendify account to manage workforce attendance and geofence settings."
        key="desc"
      />
      <meta property="og:title" content="Create Office | Attendify" />
      <meta
        property="og:description"
        content="Create office for Attendify workforce management."
      />
      <form className="space-y-6 w-full max-w-2xl bg-[#3c354d] p-8 rounded-2xl border border-purple-500/20 shadow-xl">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-white">
            Office Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mumbai Head Office"
            className="w-full text-white px-4 py-3 bg-[#2b2538] border border-purple-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/30 transition-all"
          />
          <ErrorMsg msg={error.name} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-neutral-400">Working Days</label>
          <WorkingDaysSelector
            selectedDays={selectedDays}
            canEdit={true}
            onToggle={toggleDays}
          />
          <ErrorMsg msg={error.workingDays} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="latitude" className="text-sm text-white">
              Latitude
            </label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              value={lat || ""}
              onChange={(e) => setLat(Number(e.target.value))}
              placeholder="19.0760"
              className="w-full text-white px-4 py-3 bg-[#2b2538] border border-purple-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/30"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="longitude" className="text-sm text-white">
              Longitude
            </label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              value={long || ""}
              onChange={(e) => setLong(Number(e.target.value))}
              placeholder="72.8777"
              className="w-full text-white px-4 py-3 bg-[#2b2538] border border-purple-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/30"
            />
          </div>
          <ErrorMsg msg={error.coordinates} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="startTime" className="text-sm text-white">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full text-white px-4 py-3 bg-[#2b2538] border border-purple-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
            />
            <ErrorMsg msg={error.workStartTime} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="endTime" className="text-sm text-neutral-400">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full text-white px-4 py-3 bg-[#2b2538] border border-purple-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
            />
            <ErrorMsg msg={error.workEndTime} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="radius" className="text-sm text-neutral-400">
            Geofence Radius (meters)
          </label>
          <input
            type="number"
            name="radius"
            id="radius"
            value={radius || ""}
            onChange={(e) => setRadius(Number(e.target.value))}
            placeholder="e.g. 70"
            className="w-full text-white px-4 py-3 bg-[#2b2538] border border-purple-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/30"
          />
          <ErrorMsg msg={error.geofence_radius} />
        </div>
        {error.form && (
          <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg text-red-300 text-sm text-center">
            {error.form}
          </div>
        )}

        <button
          type="button"
          onClick={handleCreateOffice}
          className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all mt-4"
        >
          Create Office
        </button>
      </form>
    </div>
  );
};

export default CreateOffice;
