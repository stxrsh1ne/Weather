import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../interface/forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl: string = 'https://api.weatherapi.com/v1/forecast.json';

  constructor(private http: HttpClient) {}

  getWeatherForecast(city: string): Observable<WeatherResponse> {
    const url = `${this.baseUrl}?q=${city}&days=${7}`;
    return this.http.get<WeatherResponse>(url);
  }
}
