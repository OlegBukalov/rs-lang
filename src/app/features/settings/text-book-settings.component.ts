import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ITextBookSettings } from './interfaces/itext-book-settings';
import { TextBookSettingsService } from './services/text-book-settings.service';

@Component({
  selector: 'app-text-book-settings',
  templateUrl: './text-book-settings.component.html',
  styleUrls: ['./text-book-settings.component.scss'],
})
export class TextBookSettingsComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  private settings: ITextBookSettings;

  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private textBookSettingsService: TextBookSettingsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.updateSettings();
    }
    if (!this.authService.loginData) {
      this.resetSettings();
    }
    this.initializeToggles();
  }

  updateSettings(): void {
    this.subscription = this.textBookSettingsService.getSettingsFromServer().subscribe(
      (data) => {
        this.textBookSettingsService.setSettings(data.optional);
        this.initializeToggles();
      },
      () => {
        this.resetSettings();
        this.initializeToggles();
      },
    );
  }

  resetSettings() {
    this.textBookSettingsService.resetSettings();
  }

  initializeToggles() {
    this.settings = this.textBookSettingsService.getSettings();
    this.formGroup = this.formBuilder.group({
      isWordTranslationHidden: [this.settings.isWordTranslationHidden, Validators.required],
      isSentenceTranslationHidden: [this.settings.isSentenceTranslationHidden, Validators.required],
      isHardWordsBtnHidden: [this.settings.isHardWordsBtnHidden, Validators.required],
      isDeletedWordsBtnHidden: [this.settings.isDeletedWordsBtnHidden, Validators.required],
    });
  }

  onFormSubmit() {
    this.textBookSettingsService.setSettings(this.formGroup.value);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
