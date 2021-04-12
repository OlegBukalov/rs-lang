import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
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

  // TODO: use auth interceptor for authorization headers
  private get httpHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.token}` });
  }

  private get baseUrl() {
    return `${environment.baseUrl}/users/${this.authService.userId}`;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toaster: ToasterService,
  ) {}

  async addSettingsToServer(passingSettings: ITextBookSettings) {
    const body = passingSettings;
    const url = `${this.baseUrl}/settings`;
    try {
      // if (await this.isAdded()) {
      //   await this.http.put(url, body, { headers: this.httpHeaders }).toPromise();
      // } else {
      await this.http.post(url, body, { headers: this.httpHeaders }).toPromise();
      // }
    } catch {
      this.toaster.showError('Настройки не сохранены', 'Ошибка!');
    }
  }

  // private async isAdded() {
  //   // TODO: отловить ошибку, если userWord не существует
  //   try {
  //     await this.http
  //       .get<ITextBookSettings>(`${this.baseUrl}/settings`, {
  //         headers: this.httpHeaders,
  //       })
  //       .toPromise();
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }

  setSettings(passingSettings: ITextBookSettings) {
    this.textBookSettings = passingSettings;
    this.addSettingsToServer(this.textBookSettings);
  }
}
