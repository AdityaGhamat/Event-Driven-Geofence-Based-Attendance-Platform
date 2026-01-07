import { useRef, useEffect } from "react";
import { updateLocation } from "../api";
import { notify } from "../components/Toast";

const Minutes = 5 * 60 * 1000;
const useLocation = (enabled: boolean) => {
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const updateCoordinates = () => {
      if (!navigator.geolocation) {
        console.warn("geolocation not supported");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await updateLocation([latitude, longitude]);
            if (res.success) {
              notify.success("Location", "location updated successfully");
            }
          } catch (error) {
            console.error("Failed to update location", error);
          }
        },
        (error) => {
          console.error("Location error:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    };
    updateCoordinates();
    intervalRef.current = window.setInterval(updateLocation, Minutes);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled]);
  return <div>useLocation</div>;
};

export default useLocation;
