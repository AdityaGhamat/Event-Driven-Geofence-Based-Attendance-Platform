import { Clock, Settings, LocateIcon } from "lucide-react";
import { days } from "../constants/days";
import { useAuth } from "../../auth/hooks/useAuth";
import "leaflet/dist/leaflet.css";
import EmployeeTable from "./EmployeeTable";
import { useEffect, useState } from "react";
import type { IEmployeeTableProps } from "../types";
import { getWorkers } from "../api";
import Map from "./Map";
import { useNavigate } from "react-router";

const SandL = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const radius = user?.office?.geofence_radius as number;

  const [workers, setWorkers] = useState<IEmployeeTableProps[]>([]);

  const canEdit = user?.role === "admin" || user?.role === "super_admin";

  type DayKey = keyof typeof days;

  const dayNumber: DayKey[] = (user?.office?.workingDays ?? []).filter(
    (day): day is keyof typeof days => day in days
  );

  const coordinates = user?.office?.coordinates;

  const hasLocation = coordinates && coordinates.length === 2;

  const fetchWorkers = async () => {
    const res = await getWorkers();
    if (res.success) {
      setWorkers(res.data);
    }
  };
  useEffect(() => {
    fetchWorkers();
  }, []);

  const onHittingSetting = () => {
    navigate("/dashboard/office/settings");
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,35%)_1fr] gap-6 mb-6">
        {/* Box 1 */}
        <div className="border border-purple-500/30 p-5 space-y-8 rounded-xl my-3 bg-[#3c354d]">
          <div className="flex justify-between items-center">
            <span className="flex gap-3">
              <Clock className=" text-fuchsia-400" />
              <h1>Schedule & Timing</h1>
            </span>

            {canEdit && (
              <Settings
                onClick={onHittingSetting}
                className="cursor-pointer hover:text-purple-300 transition-colors"
              />
            )}
          </div>

          <div className="flex flex-col">
            <h2>Working Hours</h2>
            <span>
              {user?.office?.workStartTime} - {user?.office?.workEndTime}
            </span>
          </div>
          <div className="gap-3">
            <h1 className="text-white">Working Days</h1>
            <span className="flex flex-wrap gap-2 content-start">
              {dayNumber.map((day) => (
                <span key={day}>{days[day]}</span>
              ))}
            </span>
          </div>
        </div>
        {/* Box 2: Location */}
        <div className="border border-purple-500/30 p-5 space-y-3 rounded-xl my-3 bg-[#3c354d]">
          <div className="flex justify-between items-center">
            <span className="flex gap-x-3">
              <LocateIcon className=" text-fuchsia-400" />
              <h1>Location</h1>
            </span>

            {canEdit && (
              <Settings
                onClick={onHittingSetting}
                className="cursor-pointer hover:text-purple-300 transition-colors"
              />
            )}
          </div>

          {hasLocation ? (
            <>
              <div className="flex gap-x-3 bg-[#1e1b2e] p-1 rounded-lg">
                <span className="px-2">Lat: {coordinates[0]}</span>
                <span className="px-2">Long: {coordinates[1]}</span>
              </div>
              <div className="flex-1 w-full h-37.5 rounded-lg overflow-hidden border border-white/10 relative z-0">
                <Map
                  latitude={coordinates[0]}
                  longitude={coordinates[1]}
                  radius={radius}
                />
              </div>
            </>
          ) : (
            <div className="h-37.5 flex items-center justify-center bg-[#1e1b2e] rounded-lg text-neutral-400">
              Location data unavailable
            </div>
          )}
        </div>
      </div>
      <div>
        <EmployeeTable employees={workers} onUpdate={fetchWorkers} />
      </div>
    </div>
  );
};

export default SandL;
