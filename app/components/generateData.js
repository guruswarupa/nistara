const fetch = require('node-fetch');

const API_ENDPOINT = 'http://localhost:3000/api/data'; // Replace with your API endpoint
const INTERVAL_MS = 5000; // Send data every 5 seconds

// Initial sensor data
let sensorData = {
  mq2: 250, // Initial air quality value (arbitrary midpoint)
  soil_moisture: 50, // Initial soil moisture value (arbitrary midpoint)
  pressure: 1013 / 2, // Initial pressure value (arbitrary midpoint)
  altitude: 500, // Initial altitude value (arbitrary midpoint)
  temp: 25, // Initial temperature value (arbitrary midpoint)
  humidity: 50, // Initial humidity value (arbitrary midpoint)
  imu_status: 'Active', // Initial IMU status
  gps: { lat: 0, lon: 0 }, // Initial GPS coordinates as numbers
};

function getRandomDelta(value, percentage = 2) {
  const delta = value * (percentage / 100);
  return (Math.random() * delta * 2) - delta; // Random value between -delta and +delta
}

function generateData() {
  // Update sensor data with small deviations and keep the desired precision
  const newMq2 = Math.min(Math.max(sensorData.mq2 + getRandomDelta(sensorData.mq2), 0), 500);
  sensorData.mq2 = parseFloat(newMq2.toFixed(2)); // Round and ensure it's a number
  
  const newSoilMoisture = Math.min(Math.max(sensorData.soil_moisture + getRandomDelta(sensorData.soil_moisture), 0), 100);
  sensorData.soil_moisture = parseFloat(newSoilMoisture.toFixed(1)); // Round and ensure it's a number

  const newPressure = Math.min(Math.max(sensorData.pressure + getRandomDelta(sensorData.pressure), 0), 1013);
  sensorData.pressure = parseFloat(newPressure.toFixed(2)); // Round and ensure it's a number

  const newAltitude = Math.min(Math.max(sensorData.altitude + getRandomDelta(sensorData.altitude), 0), 1000);
  sensorData.altitude = parseFloat(newAltitude.toFixed(1)); // Round and ensure it's a number

  const newTemp = Math.min(Math.max(sensorData.temp + getRandomDelta(sensorData.temp), -10), 50);
  sensorData.temp = parseFloat(newTemp.toFixed(1)); // Round and ensure it's a number

  const newHumidity = Math.min(Math.max(sensorData.humidity + getRandomDelta(sensorData.humidity), 0), 100);
  sensorData.humidity = parseFloat(newHumidity.toFixed(1)); // Round and ensure it's a number

  // Toggle IMU status occasionally
  if (Math.random() < 0.05) {
    sensorData.imu_status = sensorData.imu_status === 'Active' ? 'Inactive' : 'Active';
  }

  // Generate new GPS coordinates with slight variation
  sensorData.gps.lat += getRandomDelta(sensorData.gps.lat, 0.01);
  sensorData.gps.lon += getRandomDelta(sensorData.gps.lon, 0.01);

  // Ensure GPS precision to 3 decimal places
  sensorData.gps.lat = parseFloat(sensorData.gps.lat.toFixed(3));
  sensorData.gps.lon = parseFloat(sensorData.gps.lon.toFixed(3));

  // Return the full data
  return { 
    ...sensorData,
    gps: `Lat: ${sensorData.gps.lat}, Lon: ${sensorData.gps.lon}`
  };
}

async function sendData() {
  const data = generateData();
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to send data: ${response.statusText}`);
    }

    console.log('Data sent successfully:', data);
  } catch (error) {
    console.error('Error sending data:', error);
  }
}

setInterval(sendData, INTERVAL_MS);
