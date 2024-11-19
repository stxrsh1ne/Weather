import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from '../service/weather.service';
import { WeatherResponse } from '../interface/forecast';
import { DailyForecast } from '../interface/daily-forecast';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  searchInput = new FormControl();
  weather: string = '';
  iconUrl: string = '';
  dailyForecast: DailyForecast[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.visitedCities) {
      console.log('Previously visited cities:', state.visitedCities);
    }
  }

  getWeather() {
    const city = this.searchInput.value;
    if (!city) {
      this.weather = '';
      this.iconUrl = '';
      return;
    }

    const currentState = history.state;
    const visitedCities = currentState.visitedCities || [];
    visitedCities.push(city);
    history.pushState({ visitedCities }, '', `?city=${city}`);

    this.weatherService.getWeatherCurrently(city).subscribe(
      (res: WeatherResponse) => {
        this.weather =
          `Current temperature is ${res.main.temp}°C, ` +
          `humidity: ${res.main.humidity}%`;
        this.iconUrl = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;

        this.get5DayForecast(res.coord.lat, res.coord.lon);
      },
      err => console.log(`Can't get weather. Error: ${err.message}`)
    );
  }

  get5DayForecast(lat: number, lon: number) {
    this.weatherService.get5DayForecast(lat, lon).subscribe(
      (forecast: DailyForecast[]) => {
        this.dailyForecast = forecast;
        console.log('5-Day Forecast:', this.dailyForecast);
      },
      err => console.log(`Can't get 5-day forecast. Error: ${err.message}`)
    );
  }
}
