import { useState, useEffect, type ChangeEvent } from "react";
import type { IMapProps } from "../types";
import Map from "./Map";
import { Lock, MapPin, CircleDashed, RotateCcw, Save } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { updateCoordinates, updateRadius } from "../api";
import { notify } from "../../../components/Toast";

interface LandTProps extends IMapProps {
  onLocationChange?: (lat: number, long: number) => void;
}

const LandT = ({ latitude, longitude, onLocationChange }: LandTProps) => {
  const { user, refetchUser } = useAuth();

  const [lat, setLat] = useState<string | number>(latitude || "");
  const [long, setLong] = useState<string | number>(longitude || "");
  const [radius, setRadius] = useState<string | number>(
    user?.office?.geofence_radius ?? 70
  );

  const [isLocked, setIsLocked] = useState<boolean>(true);

  const isSuperAdmin = user?.role === "super_admin";

  useEffect(() => {
    if (latitude) setLat(latitude);
    if (longitude) setLong(longitude);
    if (user?.office?.geofence_radius) setRadius(user.office.geofence_radius);
  }, [latitude, longitude, user]);

  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLat(e.target.value);
    if (onLocationChange)
      onLocationChange(Number(e.target.value), Number(long));
  };

  const handleLongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLong(e.target.value);
    if (onLocationChange) onLocationChange(Number(lat), Number(e.target.value));
  };

  const handleRadiusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadius(e.target.value);
  };

  const handleCancel = () => {
    setLat(latitude || "");
    setLong(longitude || "");
    setRadius(user?.office?.geofence_radius ?? 70);
    setIsLocked(true);
    notify.info("Changes Reverted", "Form reset to original values.");
  };

  const handleUpdateCoordinates = async () => {
    const latNum = Number(lat);
    const longNum = Number(long);
    const radNum = Number(radius);

    const dbLat = Number(latitude);
    const dbLong = Number(longitude);
    const dbRadius = Number(user?.office?.geofence_radius);

    const isLocChanged = latNum !== dbLat || longNum !== dbLong;
    const isRadChanged = radNum !== dbRadius;

    if (!isLocChanged && !isRadChanged) {
      notify.info("No Changes", "You haven't made any changes to save.");
      return;
    }

    let title = "Update Configuration?";
    let message = "";

    if (isLocChanged && isRadChanged) {
      message =
        "You are updating BOTH location and radius. Employees outside this new boundary won't be able to mark attendance.";
    } else if (isLocChanged) {
      message =
        "You are moving the office location. Please ensure the pin is accurate.";
    } else if (isRadChanged) {
      message = `You are resizing the geofence to ${radNum} meters.`;
    }

    notify.confirm(
      message,
      async () => {
        try {
          const promises = [];
          if (isLocChanged) promises.push(updateCoordinates([latNum, longNum]));
          if (isRadChanged) promises.push(updateRadius(radNum));

          const results = await Promise.all(promises);
          const allSuccess = results.every((res) => res.success);

          if (allSuccess) {
            notify.success(
              "Configuration Saved",
              "Office location and settings updated."
            );
            await refetchUser();
            setIsLocked(true);
          }
        } catch (error) {
          notify.error("Update Failed", "Could not save office configuration.");
        }
      },
      {
        title: title,
        confirmText: "Yes, Update",
        variant: "danger",
      }
    );
  };

  return (
    <div className="bg-[#3c354d] p-6 rounded-xl border border-purple-400/30 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-semibold flex items-center gap-2">
          <MapPin className="text-purple-400 w-5 h-5" />
          Office Coordinates
        </h2>

        {isSuperAdmin && (
          <button
            onClick={() => (isLocked ? setIsLocked(false) : handleCancel())}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${
                isLocked
                  ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/50"
                  : "bg-neutral-500/20 text-neutral-300 hover:bg-neutral-500/30 border border-neutral-500/50"
              }
            `}
          >
            {isLocked ? (
              <>
                <Lock className="w-4 h-4" /> Reconfigure
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4" /> Cancel
              </>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="latitude"
              className="text-neutral-300 text-sm font-medium"
            >
              Latitude
            </label>
            <input
              className={`
                bg-[#2b2538] border text-white rounded-lg px-4 py-2.5 transition-all
                focus:outline-none focus:ring-2 focus:ring-purple-500
                disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#1e1b2e]
                ${isLocked ? "border-transparent" : "border-purple-400/50"}
              `}
              id="latitude"
              type="number"
              value={lat}
              onChange={handleLatChange}
              disabled={isLocked}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="longitude"
              className="text-neutral-300 text-sm font-medium"
            >
              Longitude
            </label>
            <input
              className={`
                bg-[#2b2538] border text-white rounded-lg px-4 py-2.5 transition-all
                focus:outline-none focus:ring-2 focus:ring-purple-500
                disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#1e1b2e]
                ${isLocked ? "border-transparent" : "border-purple-400/50"}
              `}
              id="longitude"
              type="number"
              value={long}
              onChange={handleLongChange}
              disabled={isLocked}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="radius"
              className="text-neutral-300 text-sm font-medium flex items-center gap-2"
            >
              <CircleDashed className="w-4 h-4 text-purple-400" />
              Geofence Radius
            </label>
            <div className="relative">
              <input
                className={`
                  w-full bg-[#2b2538] border text-white rounded-lg px-4 py-2.5 transition-all
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#1e1b2e]
                  ${isLocked ? "border-transparent" : "border-purple-400/50"}
                `}
                id="radius"
                type="number"
                value={radius}
                onChange={handleRadiusChange}
                disabled={isLocked}
              />
              <span className="absolute right-4 top-2.5 text-neutral-500 text-sm">
                meters
              </span>
            </div>
          </div>

          {!isLocked && (
            <button
              className="
                mt-2 flex items-center justify-center gap-2
                px-4 py-3
                bg-purple-600 hover:bg-purple-500
                text-white font-bold
                rounded-xl
                transition-all duration-200
                shadow-lg shadow-purple-500/20
                animate-in fade-in slide-in-from-left-4
              "
              onClick={handleUpdateCoordinates}
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          )}
        </div>

        <div
          className={`
            h-100 lg:h-auto w-full rounded-xl overflow-hidden border border-white/10 relative transition-all duration-300
            ${
              isLocked
                ? "grayscale-[0.5] opacity-90"
                : "ring-2 ring-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            }
          `}
        >
          <Map
            latitude={Number(lat)}
            longitude={Number(long)}
            radius={Number(radius)}
          />

          {isLocked && (
            <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
              <div className="bg-black/60 px-4 py-2 rounded-full text-white text-sm flex items-center gap-2">
                <Lock className="w-3 h-3" /> Map Locked
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandT;
