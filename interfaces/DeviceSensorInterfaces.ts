// interfaces/DeviceSensorInterfaces.ts
export interface Device {
  name: string;
  type: string;
  productNumber: string;
  labels: {
    kit: string;
    name?: string;
  };
  reported: {
    networkStatus: {
      signalStrength: number;
      rssi: number;
      updateTime: string;
      cloudConnectors: Array<{
        id: string;
        signalStrength: number;
        rssi: number;
      }>;
      transmissionMode: string;
    };
    batteryStatus: {
      percentage: number;
      updateTime: string;
    };

    co2?: {
      ppm: number;
      updateTime: string;
    };
    humidity?: {
      temperature: number;
      relativeHumidity: number;
      updateTime: string;
    };
    pressure?: {
      pascal: number;
      updateTime: string;
    };
    temperature?: {
      value: number;
      updateTime: string;
      samples: Array<{
        value: number;
        sampleTime: string;
      }>;
    };
  };
}

export interface DeviceSensorInterfaces {
  devices: Device[];
  nextPageToken: string;
}
