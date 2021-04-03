/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWord } from '../interfaces/iword';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService {
  private baseUrl = 'https://afternoon-falls-25894.herokuapp.com/words';
  private pageToken = '0';
  private groupToken = '0';

  constructor(private http: HttpClient) {}

  private get wordListUrl() {
    return `${this.baseUrl}?page=${this.pageToken}&group=${this.groupToken}`;
  }

  getWordList(): Observable<IWord[]> {
    return this.http.get<IWord[]>(this.wordListUrl);
  }

  getCardById(id: string): Observable<IWord> {
    return this.http.get<IWord>(`${this.baseUrl}/${id}`);
  }

  changePageToken(passedPageToken: string): void {
    this.pageToken = passedPageToken;
  }

  changeGroupToken(passedGroupToken: string): void {
    this.groupToken = passedGroupToken;
  }
}
