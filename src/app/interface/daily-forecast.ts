export interface DailyForecast {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}
