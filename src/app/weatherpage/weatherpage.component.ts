import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../service/weather.service';
import { CityWeather, WeatherResponse } from '../interface/forecast';

@Component({
  selector: 'app-weatherPage',
  templateUrl: './weatherPage.component.html',
  styleUrls: ['./weatherPage.component.css']
})
export class weatherPageComponent implements OnInit {
  cityWeatherList: CityWeather[] = [];
  inputCity: string = '';
  weatherData?: WeatherResponse;

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    const savedCities = localStorage.getItem('searchedCities');
    if (savedCities) {
      this.cityWeatherList = JSON.parse(savedCities);
    }

    const lastSelectedCity = localStorage.getItem('lastSelectedCity');
    if (lastSelectedCity) {
      this.inputCity = lastSelectedCity;
    }
  }

  getWeather(): void {
    if (this.inputCity) {
      this.weatherService.getWeatherForecast(this.inputCity).subscribe(
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

  addCityWeather(data: WeatherResponse): void {
    const existingCity = this.cityWeatherList.find(c => c.name === data.location.name);
    if (!existingCity) {
      this.cityWeatherList.push({ name: data.location.name, weather: data });
      localStorage.setItem('searchedCities', JSON.stringify(this.cityWeatherList));
    }
  }

  getWeatherForCity(city: CityWeather): void {
    localStorage.setItem('lastSelectedCity', city.name);
    this.router.navigate(['/main'], { queryParams: { city: city.name } });
  }


  goBack(): void {
    this.router.navigate(['/main']);
  }
}
