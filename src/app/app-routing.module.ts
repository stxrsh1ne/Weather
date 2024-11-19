import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeatherComponent} from './weather/weather.component';

const routes: Routes = [
  {path: 'main', component: WeatherComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
