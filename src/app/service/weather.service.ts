import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, EMPTY} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {WeatherResponse} from '../interface/forecast';
import {DailyForecast} from '../interface/daily-forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseWeatherURL = 'https://api.openweathermap.org/data/2.5/';
  private urlSuffix = "&units=metric";

  constructor(private http: HttpClient) {
  }

  getWeatherCurrently(city: string): Observable<WeatherResponse> {
    const url = `${this.baseWeatherURL}weather?q=${city}${this.urlSuffix}`;
    return this.http.get<WeatherResponse>(url)
      .pipe(catchError(err => {
        if (err.status === 404) {
          console.log(`Город ${city} не найден`);
          return EMPTY;
        }
        throw err;
      }));
  }

  get5DayForecast(lat: number, lon: number): Observable<DailyForecast[]> {
    const url = `${this.baseWeatherURL}forecast?lat=${lat}&lon=${lon}${this.urlSuffix}`;
    return this.http.get<{ list: DailyForecast[] }>(url).pipe(
      map(response => response.list.filter((_, index) => index % 8 === 0)),
      catchError(err => {
        console.error('Ошибка при получении 5-дневного прогноза:', err);
        return EMPTY;
      })
    );
  }
}
