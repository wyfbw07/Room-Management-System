// components/MapComponent/MapComponent.tsx
"use client";
import React, { useEffect, useState } from 'react';

export default function MapComponent() {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [imageVersion, setImageVersion] = useState<string | null>(null); // Initialize without a value

  useEffect(() => {
    setImageVersion(`${Date.now()}`);
    const fetchHeatMap = async () => {
      setIsLoading(true); // Begin loading
      try {
        // Commented out the fetchHeatMap call. Not related to the final project.
        // Assuming the heatmap generation triggers a new image to be saved/updated at '/temperature_heatmap.png'
        // await fetch('/api/generate-temperature-heatmap', { method: 'POST' });
        setImageVersion(`${Date.now()}`);  // Update image version to current timestamp after fetch
      } catch (error) {
        console.error('[Temperature Heatmap] Error generating heatmap:', error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    // Commented out the fetchHeatMap call. Not related to the final project.
    // // Delay before the first call to fetchHeatMap
    // const delayBeforeFirstFetch = 60 * 1000; // 60 seconds minutes delay

    // // Set a timeout to delay the first fetchHeatMap call
    // const timeoutId = setTimeout(() => {
    //   fetchHeatMap();
    //   // Set an interval to periodically call fetchHeatMap
    //   const fetchInterval = 3 * 60 * 1000; // 3 minutes interval
    //   setInterval(fetchHeatMap, fetchInterval);
    // }, delayBeforeFirstFetch);

    // // Cleanup function to clear the timeout and interval when the component unmounts
    // return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <h2>Temperature Heat Map</h2>
      <div style={{
        backgroundColor: '#424242',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: '10px',
        minHeight: '200px' 
      }}>
        <img src={`/temperature_heatmap.png?version=${imageVersion}`} alt="Map Image" style={{ width: '98%', height: 'auto' }} />
      </div>
    </div>
  );
}
