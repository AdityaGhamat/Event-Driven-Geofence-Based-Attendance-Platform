const toMinutes = (timeStr: string) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};
export const getTrackingOptions = (
  officeStart: string,
  officeEnd: string,
  isUserInsideGeofence: boolean
) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = toMinutes(officeStart);
  const endMinutes = toMinutes(officeEnd);

  if (
    currentMinutes >= startMinutes - 30 &&
    currentMinutes <= startMinutes + 30
  ) {
    return { accuracy: 6, interval: 2 * 60 * 1000, distance: 10 }; // 2 mins, 10m diff
  }
  if (currentMinutes > startMinutes + 30 && currentMinutes <= endMinutes) {
    return { accuracy: 3, interval: 15 * 60 * 1000, distance: 100 }; // 15 mins, 100m diff
  }
  if (currentMinutes > endMinutes && currentMinutes <= endMinutes + 60) {
    // If they already left the geofence, we stop tracking to respect privacy.
    if (!isUserInsideGeofence) return null;
    return { accuracy: 5, interval: 5 * 60 * 1000, distance: 50 }; // 5 mins
  }
  if (
    currentMinutes >= startMinutes - 120 &&
    currentMinutes < startMinutes - 30
  ) {
    return { accuracy: 3, interval: 15 * 60 * 1000, distance: 500 }; // 15 mins
  }
  return null;
};
