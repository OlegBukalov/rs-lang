/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { environment } from 'src/environments/environment';
import { DictionaryCategory } from 'src/app/features/dictionary/dictionary-category';
import { namesByCategory } from 'src/app/features/dictionary/name-by-category';
import { map } from 'rxjs/operators';
import { IWordPage } from '../interfaces/iword-page';
import { IGameStats, IUserWord } from '../interfaces/iuser-word';
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

  async deleteWordFromDictionary(wordId: string) {
    await this.http.delete(`${this.baseUrl}/words/${wordId}`).toPromise();
  }

  getAggregatedWordById(wordId: string): Observable<IUserWord> {
    return this.http.get<IUserWord>(`${this.baseUrl}/words/${wordId}`);
  }

  getAggregatedWords(
    groupId: string,
    pageId: string,
    ...categories: DictionaryCategory[]
  ): Observable<IWordPage[]> {
    const filter = this.getQuaryFilter(categories);
    let url = `${this.baseUrl}/aggregatedWords/?wordsPerPage=${MAX_WORDS_PER_PAGE}`;
    url += filter ? `&filter=${filter}` : '';
    url += groupId ? `&group=${groupId}` : '';

    let result = this.http.get<IWordPage[]>(url).pipe(map((pages) => this.resolveId(pages)));
    if (pageId) {
      result = result.pipe(map((pages) => this.pageFilter(pages, pageId)));
    }
    return result;
  }

  private getQuaryFilter(categories: DictionaryCategory[]) {
    if (!categories.length) return '';
    const filters = categories.map((category) => {
      return `{"userWord.optional.category":"${namesByCategory[category]}"}`;
    });
    if (filters.length === 1) return filters[0];

    return `{"$or":[${filters.join(',')}]}`;
  }

  private resolveId(pages: IWordPage[]): IWordPage[] {
    return pages.map((page) => {
      return {
        ...page,
        paginatedResults: page.paginatedResults.map((card) => {
          return { ...card, id: card._id };
        }),
      };
    });
  }

  private pageFilter(pages: IWordPage[], pageId: string): IWordPage[] {
    const page = pages[0];
    const cards = page.paginatedResults.filter((card) => {
      return card.page.toString() === pageId;
    });
    return [
      {
        paginatedResults: cards,
        totalCount: page.totalCount,
      },
    ];
  }

  async addWordsToDictionary(wordsIdentifiers: string[], category: DictionaryCategory) {
    wordsIdentifiers.forEach((wordId) => {
      this.addWordAndHandleErrors(wordId, category, false, true);
    });
  }

  async addWordToDictionary(wordId: string, category: DictionaryCategory) {
    await this.addWordAndHandleErrors(wordId, category, true, false);
  }

  private async addWordAndHandleErrors(
    wordId: string,
    category: DictionaryCategory,
    showToasterMessage: boolean,
    updateStats: boolean,
  ) {
    try {
      const isAdded = await this.tryToAddWordToDictionary(wordId, category, updateStats);
      if (showToasterMessage && !isAdded) {
        this.toaster.showSuccess('Слово добавлено в словарь', 'Успех!');
      }
    } catch {
      if (showToasterMessage) {
        this.toaster.showError('Слово не добавлено в словарь', 'Ошибка!');
      }
    }
  }

  private async tryToAddWordToDictionary(
    wordId: string,
    category: DictionaryCategory,
    updateStats: boolean,
  ) {
    const url = `${this.baseUrl}/words/${wordId}`;
    const gamesStats = await this.getWordGamesStats(wordId);
    const body = { optional: { category: namesByCategory[category], gamesStats } };

    if (this.isGameStatsDefined(gamesStats)) {
      if (updateStats) body.optional.gamesStats = this.updateGameStats(gamesStats, category);
      await this.http.put(url, body).toPromise();
      return true;
    }

    const stats: IGameStats = { rightAnswersCount: 0, wrongAnswersCount: 0 };
    body.optional.gamesStats = stats;
    if (updateStats) body.optional.gamesStats = this.updateGameStats(stats, category);
    await this.http.post(url, body).toPromise();
    return false;
  }

  private isGameStatsDefined(stats: IGameStats): boolean {
    return stats.rightAnswersCount !== -1 && stats.wrongAnswersCount !== -1;
  }

  private updateGameStats(stats: IGameStats, category: DictionaryCategory): IGameStats {
    const result = stats;
    if (category === DictionaryCategory.Studied) result.rightAnswersCount += 1;
    if (category === DictionaryCategory.Hard) result.wrongAnswersCount += 1;
    return result;
  }

  private async getWordGamesStats(wordId: string): Promise<IGameStats> {
    try {
      const card = await this.http.get<IUserWord>(`${this.baseUrl}/words/${wordId}`).toPromise();
      return card.optional.gamesStats || { rightAnswersCount: 0, wrongAnswersCount: 0 };
    } catch {
      return { rightAnswersCount: -1, wrongAnswersCount: -1 };
    }
  }
}
