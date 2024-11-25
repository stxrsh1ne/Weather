import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../service/weather.service';
import {CityWeather, WeatherResponse} from '../interface/forecast';
import {SettingsService} from '../service/settings.service';

@Component({
  selector: 'app-weatherPage',
  templateUrl: './weatherPage.component.html',
  styleUrls: ['./weatherPage.component.css']
})
export class WeatherPageComponent implements OnInit {
  cityWeatherList: CityWeather[] = [];
  inputCity: string = '';
  weatherData!: WeatherResponse;
  temperatureUnit: string = 'C';

  constructor(private weatherService: WeatherService,
              private router: Router,
              private settingsService: SettingsService) {}

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

  goBack(): void {
    this.router.navigate(['/weather']);
  }

  getTemperatureMin(weather: WeatherResponse): string {
    return this.temperatureUnit === 'C'
      ? `${weather.forecast.forecastday[0].day.mintemp_c} °C`
      : `${weather.forecast.forecastday[0].day.mintemp_f} °F`;
  }

  getTemperatureMax(weather: WeatherResponse): string {
    return this.temperatureUnit === 'C'
      ? `${weather.forecast.forecastday[0].day.maxtemp_c} °C`
      : `${weather.forecast.forecastday[0].day.maxtemp_f} °F`;
  }

  clearLocalStorage(): void {
    localStorage.removeItem('searchedCities');
    localStorage.removeItem('lastSelectedCity');
    this.cityWeatherList = [];
  }
}
