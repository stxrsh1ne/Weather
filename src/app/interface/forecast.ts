export interface WeatherResponse {
  dt: number;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  temp: {
    day: number;
    night: number;
  };
  wind:{
    speed: number;
  }
  pop: number;
  rain?: {
    '3h': number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
  coord: {
    lat: number;
    lon: number;
  };
}
