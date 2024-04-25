// components/SensorData/SensorData.tsx
"use client";
import styles from "./SensorData.module.css";
import React, { useState, useEffect } from 'react';
import { DeviceSensorInterfaces, Device } from '../../interfaces/DeviceSensorInterfaces';

// Effect hook for fetching sensor data
function SensorData() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetch-sensor-data');
        const data: DeviceSensorInterfaces = await response.json();
        setDevices(data.devices);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    // Immediately invoked function to fetch data on startup
    (async () => {
      await fetchData();
    })();

    // Set up an interval to fetch data every 2 minutes
    const intervalId = setInterval(fetchData, 120000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className={styles.sensorDataList}>
        <h2>Device Information</h2>
      </div>
      {devices.length > 0 ? (
        <ul className={styles.whiteBullets}>
          {devices.map((device) => (
            <li key={device.name}>
              <h3>{device.labels.name || device.labels.kit}</h3>
              <p>Kit: {device.labels.kit}</p>
              <p>Product Number: {device.productNumber}</p>
              <p>Type: {device.type}</p>
              {device.reported.humidity && (
                <>
                  <p>Temperature: {device.reported.humidity.temperature}°C</p>
                  <p>Humidity: {device.reported.humidity.relativeHumidity}%</p>
                </>
              )}
              {device.reported.co2 && (
                <>
                  <p>PPM: {device.reported.co2.ppm}</p>

                </>
              )}
              {device.reported.pressure && (
                <>
                  <p>hPa: {device.reported.pressure.pascal}</p>

                </>
              )}
              {/* Add other information as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <h3>•  Loading devices...</h3>
      )
      }
    </div>
  );
}

export default SensorData;
