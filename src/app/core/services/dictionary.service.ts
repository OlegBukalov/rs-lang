import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { environment } from 'src/environments/environment';
import { DictionaryCategory } from 'src/app/features/dictionary/dictionary-category';
import { DICTIONARY_FILTERS } from 'src/app/features/dictionary/dictonary-filters';
import { IWordPage } from '../interfaces/iword-page';
import { IUserWord } from '../interfaces/iuser-word';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private filters = DICTIONARY_FILTERS;

  private get baseUrl() {
    return `${environment.baseUrl}/users/${this.authService.userId}`;
  }

  //TODO: use auth interceptor for authorization headers
  private get httpHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.token}` });
  }

  private wordsPerPage = 10;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toaster: ToasterService,
  ) {}

  setWordsPerPageCount(value: number) {
    this.wordsPerPage = value;
  }

  getAggregatedWords(category: DictionaryCategory): Observable<IWordPage[]> {
    const filter = this.getCategoryFilter(category);
    const url = `${this.baseUrl}/aggregatedWords/?wordsPerPage=${this.wordsPerPage}&filter=${filter}`;
    return this.http.get<IWordPage[]>(url,{ headers: this.httpHeaders });
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

  async addWordToDictionary(wordId: string) {
    const body = { difficulty: 'easy' };
    const url = `${this.baseUrl}/words/${wordId}`;
    try {
      if (await this.isAdded(wordId)) {
        await this.http.put(url, body, { headers: this.httpHeaders }).toPromise();
      } else {
        await this.http.post(url, body, { headers: this.httpHeaders }).toPromise();
      }
    } catch {
      this.toaster.showError('Слово не добавлено в словарь', 'Ошибка!');
    }
  }

  private async isAdded(wordId: string) {
    // TODO: отловить ошибку, если userWord не существует
    try {
      await this.http
        .get<IUserWord>(`${this.baseUrl}/words/${wordId}`, { headers: this.httpHeaders })
        .toPromise();
      return true;
    } catch {
      return false;
    }
  }
}
