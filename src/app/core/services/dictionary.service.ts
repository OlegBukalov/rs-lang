import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWordPage } from '../interfaces/iword-page';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private userId = 'userId';
  private token = '6587657865';
  private baseUrl = `https://afternoon-falls-25894.herokuapp.com/${this.userId}/aggregatedWords`;
  private wordsPerPage: number;

  // TODO: inject auth service
  constructor(private http: HttpClient) { }

  getStudiedWords() {
    const filter = '{"userWord":{"$exist":"true"}}';
    return this.getAggregatedWords(filter);
  }

  getHardWords() {
    const filter = '{"$and":[{"userWord.difficulty":"hard},{"userWord":{"$exist":"true"}}]}';
    return this.getAggregatedWords(filter);
  }

  getDeletedWords() {
    const filter = '{"userWord":{"$exist":"false"}}';
    return this.getAggregatedWords(filter);
  }

  private getAggregatedWords(filter: string): Observable<IWordPage[]> {
    return this.http.get<IWordPage[]>(`${this.baseUrl}/?wordsPerPage=${this.wordsPerPage}&filter=${filter}`,{
      headers: {
        'Authorization': `Bearer ${this.token}`,
      }
    });
  }

  setWordsPerPageCount(value: number) {
    this.wordsPerPage = value;
  }
}
