import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Forecast } from '../interface/forecast';
import { CurrentWeather } from '../interface/current-weather';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  cityForecast: Forecast[] = [];
  myWeather: CurrentWeather[] = [];
  city = '';
  errorMessage: string = '';
  visitedCities: string[] = [];

  constructor(private ws: WeatherService) {}

  ngOnInit() {
    const city = this.cityDetect();
    if (city !== '') {
      this.city = city;
      this.getApiData(city);
    }
  }

  getApiData(city: string) {
    if (city.length < 1) {
      this.errorMessage = 'Please, input city name';
      return;
    }

    this.ws.getWeatherByCity(city)
      .pipe(catchError(err => {
        this.errorMessage = 'City not found. Please check the name.';
        return throwError(err);
      }))
      .subscribe((data: any) => {
        const currentWeather: CurrentWeather = {
          cityName: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          weatherKing: data.weather[0].description,
          temperature: data.main.temp,
        };

        this.myWeather.push(currentWeather);
        history.pushState({}, '', `?city=${data.name}`);

        this.visitedCities.push(data.name);
        console.log('Visited cities:', this.visitedCities);

        this.getFiveDayForecast(city);
      });
  }

  cityDetect() {
    const loc = location.href.split('?');
    const getCity: { city: string } = { city: '' };
    if (loc.length > 1) {
      const getParams = loc[1].split('&');
      getParams.forEach((item: string) => {
        const [key, value] = item.split('=');
        getCity[key as keyof typeof getCity] = decodeURIComponent(value);
      });
    }
    return getCity.city;
  }

  getFiveDayForecast(city: string) {
    this.ws.fiveDayForecast(city)
      .pipe(catchError(err => {
        return throwError(err);
      }))
      .subscribe((data: any) => {
        this.cityForecast = data.list.filter((item: any, i: number) => i % 8 === 0).map((item: any) => ({
          day: item.dt_txt,
          icon: item.weather[0].icon,
          temperature: item.main.temp,
        }));
      });
  }

  onSubmit() {
    this.cityForecast = [];
    this.myWeather = [];
    this.errorMessage = '';
    this.getApiData(this.city);
  }
}
