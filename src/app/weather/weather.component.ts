import { Component, OnInit } from '@angular/core';
import { HourlyWeather, WeatherResponse } from '../interface/forecast';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData?: WeatherResponse;
  city: string = '';
  filteredHours: HourlyWeather[] = [];
  currentTime: number = Math.floor(Date.now() / 1000);
  currentHourStart: number = Math.floor(Date.now() / 3600000) * 3600;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.currentTime = Math.floor(Date.now() / 1000);
  }

  getWeather(): void {
    if (this.city) {
      this.weatherService.getWeatherForecast(this.city).subscribe(
        (data: WeatherResponse) => {
          this.weatherData = data;
          this.currentTime = Math.floor(Date.now() / 1000);
          this.filterHours();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  filterHours(): void {
    if (this.weatherData && this.weatherData.forecast && this.weatherData.forecast.forecastday.length > 0) {

      const currentDate = new Date(this.currentTime * 1000);

      const HourStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime() / 1000;
      const HoursLater = HourStart + (23 * 3600) + 3599;
      const allHours = this.weatherData.forecast.forecastday.flatMap(day => day.hour);

      this.filteredHours = allHours.filter(hour => {
        return hour.time_epoch >= HourStart && hour.time_epoch <= HoursLater;
      });
    }
  }

  isCurrentHour(hour: HourlyWeather): boolean {
    return hour.time_epoch >= this.currentHourStart && hour.time_epoch < this.currentHourStart + 3600;
  }
}
