import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { ITextBookServerSettings } from '../interfaces/itext-book-server-settings';
import { ITextBookSettings } from '../interfaces/itext-book-settings';

@Injectable({
  providedIn: 'root',
})
export class TextBookSettingsService {
  private textBookSettings: ITextBookSettings = {
    isWordTranslationHidden: false,
    isSentenceTranslationHidden: false,
    isHardWordsBtnHidden: false,
    isDeletedWordsBtnHidden: false,
  };

  private get baseUrl() {
    return `${environment.baseUrl}/users/${this.authService?.userId}`;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toaster: ToasterService,
  ) {}

  getSettingsFromServer(): Observable<ITextBookServerSettings> {
    const url = `${this.baseUrl}/settings`;
    return this.http.get<ITextBookServerSettings>(url);
  }

  async addSettingsToServer(passingSettings: ITextBookSettings) {
    const body = { wordsPerDay: 1, optional: passingSettings };
    const url = `${this.baseUrl}/settings`;
    try {
      await this.http.put(url, body).toPromise();
    } catch {
      this.toaster.showInfo('Авторизуйтесь для сохранения на сервере', 'Уведомление');
    }
  }

  setSettingsOnSubmit(passingSettings: ITextBookSettings) {
    this.textBookSettings = passingSettings;
    this.addSettingsToServer(this.textBookSettings);
  }

  setSettingsOnLoad(passingSettings: ITextBookSettings) {
    this.textBookSettings = passingSettings;
  }

  getSettings() {
    return this.textBookSettings;
  }

  resetSettingsOnLogout() {
    this.textBookSettings = {
      isWordTranslationHidden: false,
      isSentenceTranslationHidden: false,
      isHardWordsBtnHidden: false,
      isDeletedWordsBtnHidden: false,
    };
  }
}
