import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITextBookSettings } from './interfaces/itext-book-settings';
import { TextBookSettingsService } from './services/text-book-settings.service';

@Component({
  selector: 'app-text-book-settings',
  templateUrl: './text-book-settings.component.html',
  styleUrls: ['./text-book-settings.component.scss'],
})
export class TextBookSettingsComponent {
  formGroup: FormGroup;

  settings: ITextBookSettings = this.textBookSettingsService.textBookSettings;

  constructor(formBuilder: FormBuilder, private textBookSettingsService: TextBookSettingsService) {
    this.formGroup = formBuilder.group({
      isWordTranslationHidden: [this.settings.isWordTranslationHidden, Validators.required],
      isSentenceTranslationHidden: [this.settings.isSentenceTranslationHidden, Validators.required],
      isHardWordsBtnHidden: [this.settings.isHardWordsBtnHidden, Validators.required],
      isDeletedWordsBtnHidden: [this.settings.isDeletedWordsBtnHidden, Validators.required],
    });
  }

  onFormSubmit() {
    this.textBookSettingsService.setSettings(this.formGroup.value);
    // this.textBookSettingsService.addSettingsToServer(this.formGroup.value);
  }
}
