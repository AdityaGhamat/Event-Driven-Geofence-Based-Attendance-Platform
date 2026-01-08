import { IUser } from "@/types/auth";

export function MapHtml(
  user: IUser | null,
  lat: number,
  lng: number,
  zoom?: number
) {
  const radius = user?.office?.geofence_radius || 100;
  const officeName = user?.office?.name || "Office";
  if (radius > 70) {
    zoom = 16;
  } else {
    zoom = 17;
  }
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; background-color: #2d283e; }
          #map { width: 100%; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map', { zoomControl: false }).setView([${lat}, ${lng}], ${zoom});
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
          }).addTo(map);


          var circle = L.circle([${lat}, ${lng}], {
            color: '#22c55e',       
            fillColor: '#22c55e',   
            fillOpacity: 0.2,       
            radius: ${radius}       
          }).addTo(map);


          L.marker([${lat}, ${lng}]).addTo(map)
            .bindPopup("${officeName}")
            .openPopup();
 
          
        </script>
      </body>
    </html>
  `;
}
