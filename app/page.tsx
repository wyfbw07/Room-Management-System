// Import aliases not working, use relative path instead
import Link from 'next/link';
import styles from "./page.module.css";
import Clock from "../components/Clock/Clock";
import SensorData from "../components/SensorData/SensorData";
import MapComponent from "../components/MapComponent/MapComponent";
import OccupancyMap from "../components/OccupancyMap/OccupancyMap";

export default function Page() {
  return (
    <div>
      <div style={{ marginTop: '0px', marginLeft: '20px', marginRight: '20px' }}>
        <h1>JEC 6th Floor Dashboard</h1>
      </div>
      <div className={styles.page}>
        <div style={{ marginBottom: '10px', marginLeft: '20px', marginRight: '20px' }}>
          <MapComponent />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <OccupancyMap />
        </div>
        <Clock />
        <Link href="/rooms/Room6001">Go to Room 6001</Link>
        <div style={{ marginBottom: '20px', marginTop: '20px' }}>
          <SensorData />
        </div>
      </div>
    </div>
  );
}
