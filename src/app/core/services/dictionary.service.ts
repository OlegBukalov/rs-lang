import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { environment } from 'src/environments/environment';
import { DictionaryCategory } from 'src/app/features/dictionary/dictionary-category';
import { namesByCategory } from 'src/app/features/dictionary/name-by-category';
import { IWordPage } from '../interfaces/iword-page';
import { IUserWord } from '../interfaces/iuser-word';
import { ToasterService } from './toaster.service';

const MAX_WORDS_PER_PAGE = 3600;

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private get baseUrl() {
    return `${environment.baseUrl}/users/${this.authService.userId}`;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toaster: ToasterService,
  ) {}

  getAggregatedWords(category: DictionaryCategory): Observable<IWordPage[]> {
    const filter = `{"userWord.optional.category":"${namesByCategory[category]}"}`;
    const url = `${this.baseUrl}/aggregatedWords/?wordsPerPage=${MAX_WORDS_PER_PAGE}&filter=${filter}`;
    return this.http.get<IWordPage[]>(url);
  }

  async addWordsToDictionary(wordsIdentifiers: string[], category: DictionaryCategory) {
    wordsIdentifiers.forEach((wordId) => {
      this.addWordAndHandleErrors(wordId, category, false);
    });
  }

  async addWordToDictionary(wordId: string, category: DictionaryCategory) {
    await this.addWordAndHandleErrors(wordId, category, true);
  }

  private async addWordAndHandleErrors(
    wordId: string,
    category: DictionaryCategory,
    showToasterMessage: boolean,
  ) {
    try {
      const isAdded = await this.tryToAddWordToDictionary(wordId, category);
      if (showToasterMessage && !isAdded) {
        this.toaster.showSuccess('Слово добавлено в словарь', 'Успех!');
      }
    } catch {
      if (showToasterMessage) {
        this.toaster.showError('Слово не добавлено в словарь', 'Ошибка!');
      }
    }
  }

  private async tryToAddWordToDictionary(wordId: string, category: DictionaryCategory) {
    const body = { optional: { category: namesByCategory[category] } };
    const url = `${this.baseUrl}/words/${wordId}`;
    const isAdded = await this.isAdded(wordId);
    if (isAdded) {
      await this.http.put(url, body).toPromise();
      return true;
    }
    await this.http.post(url, body).toPromise();
    return false;
  }

  private async isAdded(wordId: string) {
    // TODO: отловить ошибку, если userWord не существует
    try {
      await this.http.get<IUserWord>(`${this.baseUrl}/words/${wordId}`).toPromise();
      return true;
    } catch {
      return false;
    }
  }
}
