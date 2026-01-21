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
      <title>OfficeSettings | Attendify</title>
      <meta
        name="description"
        content="OfficeSettings of your Attendify account to manage workforce attendance and geofence settings."
        key="desc"
      />
      <meta property="og:title" content="OfficeSettings | Attendify" />
      <meta
        property="og:description"
        content="OfficeSettings for Attendify workforce management."
      />
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
