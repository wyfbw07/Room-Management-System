"use client";
import React, { useState, useEffect } from 'react';
import styles from './OccupancyMap.module.css';

const Room = ({ isOccupied, isDoorOpen }) => {
    return (
        <div
            className={`${styles.room} ${isOccupied ? styles.occupied : styles.available} ${isDoorOpen ? styles.doorOpen : styles.doorClosed}`}
        />
    );
};

const OccupancyMap = () => {
    const [room1Occupancy, setRoom1Occupancy] = useState(false);
    const [room2Occupancy, setRoom2Occupancy] = useState(false);
    const [room1DoorOpen, setRoom1DoorOpen] = useState(false);
    const [room2DoorOpen, setRoom2DoorOpen] = useState(false);

    useEffect(() => {
        async function fetchSensorData() {
            try {
                const response = await fetch('/api/fetch-sensor-data');
                const data = await response.json();

                for (const device of data.devices) {
                    const deviceId = device.name.split('/').pop();
                    // JEC 6027
                    if (deviceId === 'cf1rucojrpfg00amr660') {
                        if (device.reported.motion.state == 'OCCUPIED'){
                            setRoom1Occupancy(true);
                        }
                    // JEC 6012
                    } else if (deviceId === 'cgbh7gb7ej3g008bmp7g') {
                        if (device.reported.motion.state == 'OCCUPIED'){
                            setRoom2Occupancy(true);
                        }
                    // JEC 6027
                    } else if (deviceId === 'c8k9qjr94vs0008a8nog') {
                        if (device.reported.objectPresent.state != 'PRESENT'){
                            setRoom1DoorOpen(true);
                        }
                    // JEC 6012
                    } else if (deviceId === 'c8k9otj94vs0008a8mhg') {
                        if (device.reported.objectPresent.state != 'PRESENT'){
                            setRoom2DoorOpen(true);
                        }
                    } 
                }
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        }
        fetchSensorData();
    }, []);

    return (
        <div>
            <h2>Occupancy Map</h2>
            <div className={styles.occupancyMap}>
                <Room isOccupied={room1Occupancy} isDoorOpen={room1DoorOpen} />
                <Room isOccupied={room2Occupancy} isDoorOpen={room2DoorOpen} />
            </div>
        </div>
    );
};

export default OccupancyMap;
