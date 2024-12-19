'use client';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { isAuthenticated, userEmail } = useAuth();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch function to get data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error: unknown) {
      // Type assertion to handle error as an instance of Error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  // Use useEffect to call the fetchData function initially and set up polling
  useEffect(() => {
    fetchData(); // Fetch data once when the component mounts

    // Set up polling every 5 seconds (5000ms)
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // Handle loading and error states
  if (error) return <div className="text-red-500">Error loading data: {error}</div>;

  // Loader component for loading state
  const Loader = () => (
    <motion.div
      className="w-full h-screen flex items-center justify-center bg-opacity-50 bg-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin" />
    </motion.div>
  );

  useEffect(() => {
    const storedAuth = Cookies.get('isAuthenticated');
    if (storedAuth !== 'true') {
        Cookies.set('redirectPath', pathname, { expires: 1 });
        router.push('/login');
    }
}, [pathname, router]);

if (!isAuthenticated) {
    return <div><Loader /><div>Redirecting to login...</div></div>;
}

  if (!data) return <Loader />;

  // Prepare chart data for the dashboard
  const chartData = {
    labels: [new Date().toLocaleTimeString()],
    datasets: [
      {
        label: 'MQ-2 (Air Quality)',
        data: [data.mq2 || 0],
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Soil Moisture',
        data: [data.soil_moisture || 0],
        borderColor: 'rgba(153,102,255,1)',
      },
      {
        label: 'Pressure (hPa)',
        data: [data.pressure || 0],
        borderColor: 'rgba(255,99,132,1)',
      },
      {
        label: 'Altitude (m)',
        data: [data.altitude || 0],
        borderColor: 'rgba(255,159,64,1)',
      },
      {
        label: 'Temperature (°C)',
        data: [data.temp || 0],
        borderColor: 'rgba(54,162,235,1)',
      },
      {
        label: 'Humidity (%)',
        data: [data.humidity || 0],
        borderColor: 'rgba(255,205,86,1)',
      },
    ],
  };

  // Function to create a circular progress (odometer) style gauge
  const ProgressBar = ({ value, max, label, color }: { value: number, max: number, label: string, color: string }) => {
    const percentage = (value / max) * 100;
    return (
      <motion.div
        className="flex flex-col items-center justify-center space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg className="w-24 h-24 transform rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path
            className="text-gray-300"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
          />
          <path
            className={`text-${color}-500`}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${percentage} 100`}
            d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
          />
        </svg>
        <p className="text-xl text-gray-200">{label}</p>
        <p className={`text-2xl font-semibold text-${color}-500`}>{value} / {max}</p>
      </motion.div>
    );
  };

  return (
    <div className="mt-20 dark:bg-gray-900 p-6 space-y-6" style={{ backgroundImage: "url('/ec-bg.jpg')", backgroundSize: 'cover' }}>
      <h1 className="text-4xl font-semibold text-center text-gray-100">Sensor Dashboard</h1>

      {/* Main Sensor Data - Odometer-like Visualizations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          className="bg-white dark:bg-gray-800 bg-opacity-40 p-4 shadow-md rounded-lg text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressBar value={data.temp || 0} max={50} label="Temperature (°C)" color="blue" />
        </motion.div>
        <motion.div
          className="bg-white dark:bg-gray-800 bg-opacity-40 p-4 shadow-md rounded-lg text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressBar value={data.humidity || 0} max={100} label="Humidity (%)" color="green" />
        </motion.div>
        <motion.div
          className="bg-white dark:bg-gray-800 bg-opacity-40 p-4 shadow-md rounded-lg text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressBar value={data.pressure || 0} max={1013} label="Pressure (hPa)" color="red" />
        </motion.div>
        <motion.div
          className="bg-white dark:bg-gray-800 bg-opacity-40 p-4 shadow-md rounded-lg text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressBar value={data.altitude || 0} max={1000} label="Altitude (m)" color="yellow" />
        </motion.div>
        <motion.div
          className="bg-white dark:bg-gray-800 bg-opacity-40 p-4 shadow-md rounded-lg text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressBar value={data.soil_moisture || 0} max={100} label="Soil Moisture" color="indigo" />
        </motion.div>
        <motion.div
          className="bg-white dark:bg-gray-800 bg-opacity-40 p-4 shadow-md rounded-lg text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressBar value={data.mq2 || 0} max={500} label="MQ-2 (Air Quality)" color="purple" />
        </motion.div>
      </div>

      {/* IMU and GPS Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div
          className="bg-white dark:bg-gray-800 bg-opacity-40 p-4 shadow-md rounded-lg text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-gray-100">IMU Status</h3>
          <p className="text-xl text-gray-200">{data.imu_status || 'N/A'}</p>
        </motion.div>
        <motion.div
          className="bg-white dark:bg-gray-800 bg-opacity-40 p-4 shadow-md rounded-lg text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-gray-100">GPS</h3>
          <p className="text-xl text-gray-200">{data.gps || 'N/A'}</p>
        </motion.div>
      </div>

      {/* Line Chart for Sensor Data */}
      <motion.div
        className="bg-white dark:bg-gray-800 bg-opacity-40 p-4 shadow-md rounded-lg backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-medium text-center text-gray-100">Sensor Data Over Time</h2>
        <Line data={chartData} />
      </motion.div>
    </div>
  );
}
