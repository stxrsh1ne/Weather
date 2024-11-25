import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeatherPageComponent} from './weatherpage/weatherpage.component';
import {SettingsComponent} from './settings/settings.component';


const routes: Routes = [
  {path: '', redirectTo: '/cities', pathMatch: 'full'},
  {path: 'cities', component: WeatherPageComponent},
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then((m) => m.WeatherModule),
  },
  {path: 'settings', component: SettingsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
