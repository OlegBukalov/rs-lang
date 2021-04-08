import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextBookSettingsService {
  textBookSettings: any;

  setValues(passingTextBookSettings: any) {
    this.textBookSettings = passingTextBookSettings;
  }
}
