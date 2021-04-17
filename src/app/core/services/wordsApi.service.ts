import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IWord } from '../interfaces/iword';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService {
  private readonly baseUrl = `${environment.baseUrl}/words`;

  INIT_MISTAKES_COUNTER = 0;
  INIT_LEFT_CARDS_COUNTER = 20;
  TOTAL_CATEGORIES = 6;
  TOTAL_PAGE_CARDS = 29;

  private pageToken = '0';
  private groupToken = '0';

  private isTextbookGameOpen = false;

  constructor(private http: HttpClient) {}

  private get wordListUrl() {
    return `${this.baseUrl}?page=${this.pageToken}&group=${this.groupToken}`;
  }

  getWordList(): Observable<IWord[]> {
    return this.http.get<IWord[]>(this.wordListUrl);
  }

  getRandomWordList(): Observable<IWord[]> {
    return this.getWordList().pipe(map((arr) => this.randomize(arr)));
  }

  randomize(arr: IWord[]): IWord[] {
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

  setTextbookGameOpenFlag(newFlag: boolean): void {
    this.isTextbookGameOpen = newFlag;
  }

  getTextbookGameOpenFlag(): boolean {
    return this.isTextbookGameOpen;
  }
}
