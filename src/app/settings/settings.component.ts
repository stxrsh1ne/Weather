import {Component} from '@angular/core';
import {SettingsService} from '../service/settings.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  temperatureUnit: string;
  pressureUnit: string;
  windSpeedUnit: string;

  constructor(private settingsService: SettingsService, private router: Router) {
    const settings = this.settingsService.getSettings();
    this.temperatureUnit = settings.temperatureUnit;
    this.pressureUnit = settings.pressureUnit;
    this.windSpeedUnit = settings.windSpeedUnit;

  }

  saveSettings() {
    this.settingsService.updateSettings({
      temperatureUnit: this.temperatureUnit,
      pressureUnit: this.pressureUnit,
      windSpeedUnit: this.windSpeedUnit
    });
    this.router.navigate(['/weather']);
  }
}
