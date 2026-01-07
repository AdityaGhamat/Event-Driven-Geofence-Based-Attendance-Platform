import { useAuth } from "../../auth/hooks/useAuth";
import LandT from "../components/LandT";
import OfficeSettingsLower from "../components/OfficeSettingsLower";
const OfficeSettings = () => {
  const { user } = useAuth();
  const coordinates = user?.office?.coordinates;
  if (!coordinates || coordinates.length < 2) {
    return (
      <div className="text-gray-400 text-center py-10">
        No location data available
      </div>
    );
  }
  const [latitude, longitude] = coordinates;
  return (
    <div className="space-y-5">
      <div>
        <LandT latitude={latitude} longitude={longitude} />
      </div>
      <div>
        <OfficeSettingsLower />
      </div>
    </div>
  );
};

export default OfficeSettings;
