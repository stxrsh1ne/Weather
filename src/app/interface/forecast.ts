export interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
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
