import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  Circle,
} from "react-leaflet";
import type { IMapProps } from "../types";
import { useEffect } from "react";

const RecenterMap = ({ latitude, longitude }: IMapProps) => {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 17);
  }, [latitude, longitude, map]);

  return null;
};
interface ExtendedIMapProps extends IMapProps {
  radius: number;
}

const Map = ({ latitude, longitude, radius }: ExtendedIMapProps) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <RecenterMap latitude={latitude} longitude={longitude} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup className="text-black">Office Location</Popup>
      </Marker>
      <Circle
        center={[latitude, longitude]}
        radius={radius}
        pathOptions={{
          color: "green",
          fillColor: "green",
          fillOpacity: 0.2,
          weight: 3,
        }}
      />
    </MapContainer>
  );
};

export default Map;
