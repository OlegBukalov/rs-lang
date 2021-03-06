import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { flatMap, map } from 'rxjs/operators';
import { DictionaryCategory } from 'src/app/features/dictionary/dictionary-category';
import { namesByCategory } from 'src/app/features/dictionary/name-by-category';
import { IWord } from '../interfaces/iword';
import { DictionaryService } from './dictionary.service';
import { IWordPage } from '../interfaces/iword-page';
import { IUserWordOptional } from '../interfaces/iuser-word';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService {
  private readonly baseUrl = `${environment.baseUrl}/words`;

  INIT_MISTAKES_COUNTER = 0;
  WORDS_PER_PAGE = 20;
  TOTAL_CATEGORIES = 6;
  TOTAL_PAGE_CARDS = 29;

  private pageToken = '0';
  private groupToken = '0';

  private isTextbookGameOpen = false;

  constructor(private http: HttpClient, private dictionary: DictionaryService) {}

  private get wordListUrl() {
    return `${this.baseUrl}?page=${this.pageToken}&group=${this.groupToken}`;
  }

  getWordList(): Observable<IWord[]> {
    return this.http
      .get<IWord[]>(this.wordListUrl)
      .pipe(flatMap((cards) => this.categoryFilter(cards)));
  }

  private async categoryFilter(cards: IWord[]): Promise<IWord[]> {
    const result = await this.dictionary
      .getAggregatedWords(
        this.groupToken,
        this.pageToken,
        DictionaryCategory.Hard,
        DictionaryCategory.Deleted,
        DictionaryCategory.Studied,
      )
      .toPromise()
      .catch(() => {
        const empty: IWordPage[] = [];
        return empty;
      });
    if (!result.length || !result[0].totalCount.length) return cards;
    const aggregatedWords = result[0].paginatedResults;

    const filteredCards = this.excludeDeleted(cards, aggregatedWords);
    return filteredCards.map((card) => {
      const aggregatedWord = aggregatedWords.find((word) => {
        return word.id === card.id;
      });
      return aggregatedWord ? { ...card, userWord: aggregatedWord.userWord } : card;
    });
  }

  excludeDeleted(cards: IWord[], aggregatedWords: IWord[]): IWord[] {
    const deletedStatus = namesByCategory[DictionaryCategory.Deleted];
    return cards.filter((card) => {
      const filtered = aggregatedWords.find((aggregatedWord) => aggregatedWord.id === card.id);
      return filtered ? filtered.userWord.optional.category !== deletedStatus : true;
    });
  }

  getRandomWordList(): Observable<IWord[]> {
    return this.getWordList().pipe(map((arr) => this.randomize(arr)));
  }

  randomize(arr: IWord[]): IWord[] {
    return arr.sort(() => Math.random() - 0.5);
  }

  getCardById(id: string): Observable<IWord> {
    let optional: IUserWordOptional;
    this.dictionary.getAggregatedWordById(id).subscribe(
      (word) => {
        optional = word.optional;
      },
      () => {
        optional = {
          category: undefined,
          gamesStats: undefined,
          repeatsCount: undefined,
        };
      },
    );
    return this.http.get<IWord>(`${this.baseUrl}/${id}`).pipe(
      map((word) => {
        return { ...word, userWord: { optional } };
      }),
    );
  }

  changePageToken(passedPageToken: string): void {
    this.pageToken = passedPageToken;
  }

  getPageToken(): number {
    return Number(this.pageToken);
  }

  changeGroupToken(passedGroupToken: string): void {
    this.groupToken = passedGroupToken;
  }

  getGroupToken(): number {
    return Number(this.groupToken);
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
