import {Component} from '@angular/core';
import {SettingsService} from '../service/settings.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  temperatureUnit: string;
  pressureUnit: string;
  windSpeedUnit: string;

  constructor(private settingsService: SettingsService) {
    const settings = this.settingsService.getSettings();
    this.temperatureUnit = settings.temperatureUnit;
    this.pressureUnit = settings.pressureUnit;
    this.windSpeedUnit = settings.windSpeedUnit;
  }

  updateSettings() {
    this.settingsService.updateSettings({
      temperatureUnit: this.temperatureUnit,
      pressureUnit: this.pressureUnit,
      windSpeedUnit: this.windSpeedUnit
    });
  }
}
