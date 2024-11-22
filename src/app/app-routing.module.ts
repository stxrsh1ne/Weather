import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import {weatherPageComponent} from './weatherpage/weatherpage.component';

const routes: Routes = [
  { path: 'main', component: WeatherComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'cities', component: weatherPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
