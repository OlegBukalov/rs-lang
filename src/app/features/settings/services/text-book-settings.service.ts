import { Injectable } from '@angular/core';
import { ITextBookSettings } from '../interfaces/itext-book-settings';

@Injectable({
  providedIn: 'root',
})
export class TextBookSettingsService {
  textBookSettings: ITextBookSettings = {
    hideWordTranslation: false,
    hideSentenceTranslation: false,
    hideHardWordsBtn: false,
    hideDeletedWordsBtn: false,
  };

  setSettings(passingSettings: ITextBookSettings) {
    this.textBookSettings = passingSettings;
  }
}
