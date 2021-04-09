import { Injectable } from '@angular/core';
import { ITextBookSettings } from '../interfaces/itext-book-settings';

@Injectable({
  providedIn: 'root',
})
export class TextBookSettingsService {
  textBookSettings: ITextBookSettings;

  setSettings(passingSettings: ITextBookSettings) {
    this.textBookSettings = passingSettings;
  }
}
