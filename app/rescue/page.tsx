'use client';

import { useEffect, useState } from 'react';

type Rescuer = {
  name: string;
  lat: number;
  lng: number;
  zone: 'red' | 'orange' | 'yellow';
};

const RescuePage = () => {
  const [rescuers, setRescuers] = useState<Rescuer[]>([]);

  useEffect(() => {
    const fetchRescueData = async () => {
      const response = await fetch('/api/rescueData');
      const data = await response.json();
      setRescuers(data);
    };

    fetchRescueData(); 
    const interval = setInterval(fetchRescueData, 10000); 

    return () => clearInterval(interval); 
  }, []);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c / 50; 
  };

  const getZoneColor = (zone: 'red' | 'orange' | 'yellow') => {
    switch (zone) {
      case 'red':
        return 'bg-red-500';
      case 'orange':
        return 'bg-orange-500';
      case 'yellow':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rescue Page</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">GPS Coordinates</th>
            <th className="border px-4 py-2">Zone</th>
            <th className="border px-4 py-2">Nearest Rescuer Distance</th>
          </tr>
        </thead>
        <tbody>
          {rescuers.map((rescuer, index) => {
            const currentLat = 44045.7128;
            const currentLng = -73654.0060;
            const distance = calculateDistance(
              currentLat,
              currentLng,
              rescuer.lat,
              rescuer.lng
            );

            return (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{rescuer.name}</td>
                <td className="border px-4 py-2">
                  {rescuer.lat}, {rescuer.lng}
                </td>
                <td className={`border px-4 py-2 ${getZoneColor(rescuer.zone)}`}>
                  {rescuer.zone}
                </td>
                <td className="border px-4 py-2">{distance.toFixed(2)} km</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RescuePage;
