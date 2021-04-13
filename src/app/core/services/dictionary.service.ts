import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { environment } from 'src/environments/environment';
import { DictionaryCategory } from 'src/app/features/dictionary/dictionary-category';
import { DICTIONARY_FILTERS, getCategoryBody } from 'src/app/features/dictionary/dictonary-filters';
import { IWordPage } from '../interfaces/iword-page';
import { IUserWord } from '../interfaces/iuser-word';
import { ToasterService } from './toaster.service';

const MAX_WORDS_PER_PAGE = 3600;

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private filters = DICTIONARY_FILTERS;

  private get baseUrl() {
    return `${environment.baseUrl}/users/${this.authService.userId}`;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toaster: ToasterService,
  ) {}

  getAggregatedWords(category: DictionaryCategory): Observable<IWordPage[]> {
    const filter = this.getCategoryFilter(category);
    const url = `${this.baseUrl}/aggregatedWords/?wordsPerPage=${MAX_WORDS_PER_PAGE}&filter=${filter}`;
    return this.http.get<IWordPage[]>(url);
  }

  private getCategoryFilter(category: DictionaryCategory): string {
    switch (category) {
      case DictionaryCategory.Studied:
        return this.filters.studied;
      case DictionaryCategory.Hard:
        return this.filters.hard;
      case DictionaryCategory.Deleted:
        return this.filters.deleted;
      default:
        return '';
    }
  }

  async addWordToDictionary(wordId: string, category: DictionaryCategory) {
    const body = getCategoryBody(category);
    const url = `${this.baseUrl}/words/${wordId}`;
    try {
      if (await this.isAdded(wordId)) {
        await this.http.put(url, body).toPromise();
      } else {
        await this.http.post(url, body).toPromise();
      }
    } catch {
      this.toaster.showError('Слово не добавлено в словарь', 'Ошибка!');
    }
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
