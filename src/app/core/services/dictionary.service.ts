import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { environment } from 'src/environments/environment';
import { IWordPage } from '../interfaces/iword-page';
import { IUserWord } from '../interfaces/iuser-word';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private get baseUrl() {
    return `${environment.baseUrl}/users/${this.authService.userId}`;
  }

  private get httpHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.token}` });
  }

  private wordsPerPage = 10;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // TODO: realize filters for different categories
  getStudiedWords() {
    const filter = '{"userWord":{"$exists":"true"}}';
    return this.getAggregatedWords(filter);
  }

  getHardWords() {
    const filter = '{"$and":[{"userWord.difficulty":"hard},{"userWord":{"$exists":"true"}}]}';
    return this.getAggregatedWords(filter);
  }

  getDeletedWords() {
    const filter = '{"userWord":{"$exists":"false"}}';
    return this.getAggregatedWords(filter);
  }

  private getAggregatedWords(filter: string): Observable<IWordPage[]> {
    const url = `${this.baseUrl}/aggregatedWords/?wordsPerPage=${this.wordsPerPage}&filter=${filter}`;
    return this.http.get<IWordPage[]>(url, { headers: this.httpHeaders });
  }

  async AddWordToDictionary(wordId: string) {
    const body = { difficulty: 'easy' };
    const url = `${this.baseUrl}/words/${wordId}`;
    if (await this.isAdded(wordId)) {
      this.http.put(url, body, { headers: this.httpHeaders });
    } else {
      this.http.post(url, body, { headers: this.httpHeaders }).toPromise();
    }
  }

  async isAdded(wordId: string) {
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

  setWordsPerPageCount(value: number) {
    this.wordsPerPage = value;
  }
}
