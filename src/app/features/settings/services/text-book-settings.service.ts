import { Injectable } from '@angular/core';
import { ITextBookSettings } from '../interfaces/itext-book-settings';

@Injectable({
  providedIn: 'root',
})
export class TextBookSettingsService {
  textBookSettings: ITextBookSettings = {
    isWordTranslationHidden: false,
    isSentenceTranslationHidden: false,
    isHardWordsBtnHidden: false,
    isDeletedWordsBtnHidden: false,
  };

  setSettings(passingSettings: ITextBookSettings) {
    this.textBookSettings = passingSettings;
  }
}
