import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TextBookSettingsService } from './services/text-book-settings.service';

@Component({
  selector: 'app-text-book-settings',
  templateUrl: './text-book-settings.component.html',
  styleUrls: ['./text-book-settings.component.scss'],
})
export class TextBookSettingsComponent {
  formGroup: FormGroup;

  constructor(formBuilder: FormBuilder, private textBookSettingsService: TextBookSettingsService) {
    this.formGroup = formBuilder.group({
      hideWordTranslation: false,
      hideSentenceTranslation: false,
      hideHardWordsBtn: false,
      hideDeletedWordsBtn: false,
    });
  }

  onFormSubmit() {
    this.textBookSettingsService.setSettings(this.formGroup.value);
  }
}
