/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IWord } from '../interfaces/iword';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService {
  INIT_MISTAKES_COUNTER = 0;
  INIT_LEFT_CARDS_COUNTER = 20;
  TOTAL_CATEGORIES = 6;
  TOTAL_PAGE_CARDS = 29;

  private readonly baseUrl = 'https://afternoon-falls-25894.herokuapp.com/words';
  private pageToken = '0';
  private groupToken = '0';

  // TODO: get data by ID
  // private id = '';

  constructor(private http: HttpClient) {}

  private get wordListUrl() {
    return `${this.baseUrl}?page=${this.pageToken}&group=${this.groupToken}`;
  }

  // TODO: get data by ID
  // private get wordUrl() {
  //   return `${this.baseUrl}/${this.id}`;
  // }

  getWordList(): Observable<IWord[]> {
    return this.http.get<IWord[]>(this.wordListUrl).pipe(map((arr) => this.random(arr)));
  }

  // TODO: get data by ID
  // getWord(): Observable<IWord[]> {
  //   return this.http.get<IWord[]>(this.wordUrl);
  // }

  random(arr: IWord[]): IWord[] {
    return arr.sort(() => Math.random() - 0.5);
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

  // TODO: get data by ID
  // changeIDToken(passedIDToken: string): void {
  //   this.id = passedIDToken;
  // }

  setRandomPage(): void {
    const randomPage = Math.round(Math.random() * 29).toString();
    this.changePageToken(randomPage);
  }
}
