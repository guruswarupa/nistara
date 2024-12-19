import { useEffect, useState } from "react";
import { getSocket } from "../lib/socketUtils";

type Location = {
  lat: number;
  lng: number;
  role: "help" | "rescuer";
  deviceId: string;
};

export default function Map({ role }: { role: "help" | "rescuer" }) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = getSocket();
    const deviceId = localStorage.getItem("deviceId") || `device-${Date.now()}`;
    localStorage.setItem("deviceId", deviceId);

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setError(null); // Clear any previous errors
          const { latitude, longitude } = position.coords;
          const locationData = { lat: latitude, lng: longitude, role, deviceId };
          setUserLocation(locationData);
          socket.emit("updateLocation", locationData);
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError("Permission denied. Allow location access.");
              break;
            case err.POSITION_UNAVAILABLE:
              setError("Position unavailable. Check device/network.");
              break;
            case err.TIMEOUT:
              setError("Location request timed out.");
              break;
            default:
              setError("An unknown error occurred.");
          }
        },
        { enableHighAccuracy: true }
      );
    };

    fetchLocation();
    const locationInterval = setInterval(fetchLocation, 5000);

    socket.on("locationUpdate", (data: Location) => {
      setLocations((prev) =>
        [...prev.filter((loc) => loc.deviceId !== data.deviceId), data]
      );
    });

    return () => {
      socket.disconnect();
      clearInterval(locationInterval);
    };
  }, [role]);

  return (
    <div>
      <h1>{role === "help" ? "Help Requests" : "Rescuer Locations"}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {userLocation && (
        <iframe
          src={`https://www.openstreetmap.org/?mlat=${userLocation.lat}&mlon=${userLocation.lng}#map=15/${userLocation.lat}/${userLocation.lng}`}
          width="100%"
          height="400px"
          style={{ border: 0 }}
          allowFullScreen
        />
      )}
      {locations.map((location) => (
        <div key={location.deviceId}>
          <iframe
            src={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=15/${location.lat}/${location.lng}`}
            width="100%"
            height="300px"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
}
