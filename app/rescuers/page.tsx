// pages/rescuers.tsx
'use client';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

type Location = {
  lat: number;
  lng: number;
  role: "help" | "rescuer";
  deviceId: string;
};

const socket = io();

export default function RescuerPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId") || `device-${Date.now()}`;
    localStorage.setItem("deviceId", deviceId);

    // Function to fetch location and send it to the server
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationData: Location = { lat: latitude, lng: longitude, role: "rescuer", deviceId };
          setUserLocation(locationData);
          socket.emit("updateLocation", locationData); // Send location to server
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    };

    fetchLocation();
    const locationInterval = setInterval(fetchLocation, 5000); // Update location every 5 seconds

    // Listen for location updates from others (help seekers)
    socket.on("locationUpdate", (data: Location) => {
      setLocations((prev) => [
        ...prev.filter((loc) => loc.deviceId !== data.deviceId), // Replace old data if same deviceId
        data,
      ]);
    });

    return () => {
      socket.disconnect();
      clearInterval(locationInterval);
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rescuer Page</h1>
      <p>Your location is being shared with people requesting help.</p>

      {userLocation && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Your Location</h2>
          <iframe
            src={`https://www.openstreetmap.org/?mlat=${userLocation.lat}&mlon=${userLocation.lng}#map=15/${userLocation.lat}/${userLocation.lng}`}
            width="100%"
            height="300px"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Help Requests</h2>
        {locations
          .filter((loc) => loc.role === "help")
          .map((location) => (
            <iframe
              key={location.deviceId}
              src={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=15/${location.lat}/${location.lng}`}
              width="100%"
              height="300px"
              style={{ border: 0 }}
              allowFullScreen
              className="mt-4"
            ></iframe>
          ))}
      </div>
    </div>
  );
}