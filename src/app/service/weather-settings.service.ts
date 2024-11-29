import { Injectable } from '@angular/core';
import { WeatherResponse, CurrentWeather, ForecastDay } from '../interface/forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherFormatterService {
  constructor() {}

  getTemperatureMin(weather: WeatherResponse, temperatureUnit: string): string {
    return temperatureUnit === 'C'
      ? `${weather.forecast.forecastday[0].day.mintemp_c} °C`
      : `${weather.forecast.forecastday[0].day.mintemp_f} °F`;
  }

  getTemperatureMax(weather: WeatherResponse, temperatureUnit: string): string {
    return temperatureUnit === 'C'
      ? `${weather.forecast.forecastday[0].day.maxtemp_c} °C`
      : `${weather.forecast.forecastday[0].day.maxtemp_f} °F`;
  }

  getTemperatureMinDay(day: ForecastDay, temperatureUnit: string): string {
    return temperatureUnit === 'C'
      ? `${day.day.mintemp_c} °C`
      : `${day.day.mintemp_f} °F`;
  }

  getTemperatureMaxDay(day: ForecastDay, temperatureUnit: string): string {
    return temperatureUnit === 'C'
      ? `${day.day.maxtemp_c} °C`
      : `${day.day.maxtemp_f} °F`;
  }

  getTemperatureCurrent(current: CurrentWeather, temperatureUnit: string): string {
    return temperatureUnit === 'C' ? `${current.temp_c} °C` : `${current.temp_f} °F`;
  }

  getWindSpeed(current: CurrentWeather, windSpeedUnit: string): string {
    return windSpeedUnit === 'kph' ? `${current.wind_kph} km/h` : `${current.wind_mph} mp/h`;
  }

  getPressure(current: CurrentWeather, pressureUnit: string): string {
    return pressureUnit === 'mb' ? `${current.pressure_mb} mbar` : `${current.pressure_in} in`;
  }
}
