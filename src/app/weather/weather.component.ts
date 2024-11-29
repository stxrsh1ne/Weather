import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WeatherService} from '../service/weather.service';
import {WeatherResponse, HourlyWeather, CurrentWeather, ForecastDay} from '../interface/forecast';
import {toZonedTime} from 'date-fns-tz';
import {SettingsService} from '../service/settings.service';
import {WeatherFormatterService} from '../service/weather-settings.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData!: WeatherResponse;
  filteredHours: HourlyWeather[] = [];
  currentHourStart: number = 0;
  temperatureUnit: string = 'C';
  pressureUnit: string = 'mb';
  windSpeedUnit: string = 'kph';

  constructor(private weatherService: WeatherService,
              private route: ActivatedRoute,
              private router: Router,
              private settingsService: SettingsService,
              private weatherFormatter: WeatherFormatterService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.weatherData = data['weatherData'];
      if (this.weatherData) {
        this.calculateCurrentHourStart();
        this.filterHours();
      }
      this.loadSettings();
    });
  }

  private loadSettings(): void {
    const settings = this.settingsService.getSettings();
    this.temperatureUnit = settings.temperatureUnit;
    this.pressureUnit = settings.pressureUnit;
    this.windSpeedUnit = settings.windSpeedUnit;
  }

  calculateCurrentHourStart(): void {
    if (this.weatherData.location.tz_id) {
      const timeZone = this.weatherData.location.tz_id;
      const currentTime = new Date();
      const zonedTime = toZonedTime(currentTime, timeZone);
      this.currentHourStart = Math.floor(zonedTime.getTime() / 3600000) * 3600;
    }
  }

  filterHours(): void {
    if (this.weatherData && this.weatherData.forecast && this.weatherData.forecast.forecastday.length > 0) {
      const allHours = this.weatherData.forecast.forecastday.flatMap(day => day.hour);

      this.filteredHours = allHours.filter(hour => {
        const cityTime = new Date(hour.time_epoch * 1000);
        return cityTime.getTime() >= this.currentHourStart * 1000 &&
          cityTime.getTime() < (this.currentHourStart + 24 * 3600) * 1000;
      });
    }
  }

  isCurrentHour(hour: HourlyWeather): boolean {
    return hour.time_epoch >= this.currentHourStart && hour.time_epoch < this.currentHourStart + 3600;
  }

  getTemperatureMinHour(weather: WeatherResponse): string {
    return this.weatherFormatter.getTemperatureMin(weather, this.temperatureUnit);
  }

  getTemperatureMaxHour(weather: WeatherResponse): string {
    return this.weatherFormatter.getTemperatureMax(weather, this.temperatureUnit);
  }

  getTemperatureMinDay(day: ForecastDay): string {
    return this.weatherFormatter.getTemperatureMinDay(day, this.temperatureUnit);
  }

  getTemperatureMaxDay(day: ForecastDay): string {
    return this.weatherFormatter.getTemperatureMaxDay(day, this.temperatureUnit);
  }

  getTemperatureCurrent(current: CurrentWeather): string {
    return this.weatherFormatter.getTemperatureCurrent(current, this.temperatureUnit);
  }

  getWindSpeed(current: CurrentWeather): string {
    return this.weatherFormatter.getWindSpeed(current, this.windSpeedUnit);
  }

  getPressure(current: CurrentWeather): string {
    return this.weatherFormatter.getPressure(current, this.pressureUnit);
  }

  scrollLeft() {
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.scrollBy({left: -150, behavior: 'smooth'});
  }

  scrollRight() {
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.scrollBy({left: 150, behavior: 'smooth'});
  }
}
