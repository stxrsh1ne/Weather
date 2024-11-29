import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../service/weather.service';
import {CityWeather, WeatherResponse} from '../interface/forecast';
import {SettingsService} from '../service/settings.service';
import {WeatherFormatterService} from '../service/weather-settings.service';

@Component({
  selector: 'app-weatherPage',
  templateUrl: './weatherpage.component.html',
  styleUrls: ['./weatherpage.component.css']
})
export class WeatherPageComponent implements OnInit {
  cityWeatherList: CityWeather[] = [];
  inputCity: string = '';
  weatherData!: WeatherResponse;
  temperatureUnit: string = 'C';

  constructor(private weatherService: WeatherService,
              private router: Router,
              private settingsService: SettingsService,
              private weatherFormatter: WeatherFormatterService) {
  }

  ngOnInit(): void {
    this.loadSavedCities();
    this.loadLastSelectedCity();
    this.loadSettings();
  }

  private loadSavedCities(): void {
    const savedCities = localStorage.getItem('searchedCities');
    if (savedCities) {
      this.cityWeatherList = JSON.parse(savedCities) as CityWeather[];
    }
  }

  private loadLastSelectedCity(): void {
    const lastSelectedCity = localStorage.getItem('lastSelectedCity');
    if (lastSelectedCity) {
      this.inputCity = lastSelectedCity;
      this.getWeather(lastSelectedCity);
    }
  }

  private loadSettings(): void {
    const settings = this.settingsService.getSettings();
    this.temperatureUnit = settings.temperatureUnit;
  }

  getWeather(city: string): void {
    if (city) {
      this.weatherService.getWeatherForecast(city).subscribe(
        (data: WeatherResponse) => {
          this.weatherData = data;
          this.addCityWeather(data);
        },
        (error) => {
          console.error(error);
        }
      );
      this.inputCity = '';
    }
  }

  private addCityWeather(data: WeatherResponse): void {
    const existingCity = this.cityWeatherList.find(c => c.name === data.location.name);
    if (!existingCity) {
      this.cityWeatherList.push({name: data.location.name, weather: data});
      localStorage.setItem('searchedCities', JSON.stringify(this.cityWeatherList));
    }
  }

  getWeatherForCity(city: CityWeather): void {
    localStorage.setItem('lastSelectedCity', city.name);
    this.router.navigate(['/weather'], {queryParams: {city: city.name}});
  }

  getTemperatureMinDay(weather: WeatherResponse): string {
    return this.weatherFormatter.getTemperatureMin(weather, this.temperatureUnit);
  }

  getTemperatureMaxDay(weather: WeatherResponse): string {
    return this.weatherFormatter.getTemperatureMax(weather, this.temperatureUnit);
  }

}
