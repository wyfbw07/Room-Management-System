"use client";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./clock.module.css";

export default function Clock() {
    const [time, setTime] = useState<Date>();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.h3}>
            <h3> Current Date: {time?.toLocaleDateString()} </h3>
            <h3> Current Time: {time?.toLocaleTimeString()} </h3>
        </div>
    );
}
