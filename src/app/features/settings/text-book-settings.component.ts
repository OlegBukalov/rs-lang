import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ITextBookSettings } from './interfaces/itext-book-settings';
import { TextBookSettingsService } from './services/text-book-settings.service';

@Component({
  selector: 'app-text-book-settings',
  templateUrl: './text-book-settings.component.html',
  styleUrls: ['./text-book-settings.component.scss'],
})
export class TextBookSettingsComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  settings: ITextBookSettings = this.textBookSettingsService.textBookSettings;

  private subscription: Subscription;

  constructor(formBuilder: FormBuilder, private textBookSettingsService: TextBookSettingsService) {
    this.formGroup = formBuilder.group({
      isWordTranslationHidden: [this.settings.isWordTranslationHidden, Validators.required],
      isSentenceTranslationHidden: [this.settings.isSentenceTranslationHidden, Validators.required],
      isHardWordsBtnHidden: [this.settings.isHardWordsBtnHidden, Validators.required],
      isDeletedWordsBtnHidden: [this.settings.isDeletedWordsBtnHidden, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.subscription = this.textBookSettingsService.getSettingsFromServer().subscribe((data) => {
      this.settings = data;
    });
  }

  onFormSubmit() {
    this.textBookSettingsService.setSettings(this.formGroup.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
