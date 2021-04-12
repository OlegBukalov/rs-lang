import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DictionaryCategory } from 'src/app/features/dictionary/dictionary-category';
import { AuthService } from '../auth/auth.service';
import { DictionaryService } from '../../core/services/dictionary.service';

import { IItemListGames } from './interfaces/iitem-list-games';
import { IDataGame } from './interfaces/idata-game';

import { GameID } from './enums/game-id.enum';

type ItemGame = {
  idGame: GameID;
  countAll: number;
  countRight: number;
  maxRight: number;
};

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  // TODO временно явно прописан со значениями, будет заменено на полученные данные с бэка
  private allRightAnswers = 0;
  private readonly baseUrl = `${environment.baseUrl}/users`;
  urlUserSettings: string;

  private dataAllGames: IItemListGames[] = [
    {
      game: GameID.Savannah,
      data: {
        name: 'Саванна',
        countAnswers: 0,
        countRightAnswers: 0,
        percentRightAnswers: 0,
        maxRightAnswers: 0,
      },
    },
    {
      game: GameID.AudioCall,
      data: {
        name: 'Аудиовызов',
        countAnswers: 0,
        countRightAnswers: 0,
        percentRightAnswers: 0,
        maxRightAnswers: 0,
      },
    },
    {
      game: GameID.Sprint,
      data: {
        name: 'Спринт',
        countAnswers: 0,
        countRightAnswers: 0,
        percentRightAnswers: 0,
        maxRightAnswers: 0,
      },
    },
    {
      game: GameID.CardGame,
      data: {
        name: 'Своя игра',
        countAnswers: 0,
        countRightAnswers: 0,
        percentRightAnswers: 0,
        maxRightAnswers: 0,
      },
    },
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private dictionaryService: DictionaryService,
  ) {}

  // getWordList(): Observable<IWord[]> {
  //   return this.http.get<IWord[]>(this.wordListUrl).pipe(map((arr) => this.random(arr)));
  // }

  // getUserData(): Observable<any> {
  getUserData(): void {
    // const baseUrl = 'https://rs-lang-team-5.herokuapp.com';
    // const idUser = this.authService.loginData.userId;
    // this.URLStat = `${baseUrl}/users/${idUser}/statistics`;
    // const idUser = this.authService.loginData.userId;
    // this.urlUserSettings = `${this.baseUrl}/${idUser}/statistics`;
    // console.log(this.urlUserSettings);
    // const a = of(this.http.get<any>(this.urlUserSettings));
    // console.log(a);
    // return this.http.get<any>(this.urlUserSettings);
  }

  getAllUserWords(): number {
    let countAllWords: any;
    this.dictionaryService.getAggregatedWords(DictionaryCategory.Studied).subscribe((result) => {
      const data = result;
      // let allUserData: any;
      const [allUserData] = data;
      // console.log(allUserData);
      [countAllWords] = allUserData.totalCount;
      // console.log(countAllWords.count);
    });
    return countAllWords.count;
  }

  getDataFromGame(dataGame: ItemGame): void {
    const item = this.dataAllGames.find((itemGame) => itemGame.game === dataGame.idGame).data;
    item.countAnswers += dataGame.countAll;
    item.countRightAnswers += dataGame.countRight;
    item.maxRightAnswers = this.updateMaxRightAnswers(item, dataGame.maxRight);
    item.percentRightAnswers = this.updatePercentRightAnswers(item);
    this.updateAllRightAnswers();
  }

  updateMaxRightAnswers(item: IDataGame, maxRight: number): number {
    const currentMax = item.maxRightAnswers;
    if (currentMax < maxRight) {
      return maxRight;
    }
    return item.maxRightAnswers;
  }

  updatePercentRightAnswers(item: IDataGame): number {
    if (item.countRightAnswers !== 0) {
      const all = item.countAnswers;
      const right = item.countRightAnswers;
      return right / all;
    }
    return 0;
  }

  updateAllRightAnswers(): number {
    let all = 0;
    let right = 0;
    this.dataAllGames.forEach((item) => {
      all += item.data.countAnswers;
      right += item.data.countRightAnswers;
      return item;
    });
    this.allRightAnswers = right / all;
    return this.allRightAnswers;
  }

  getAllRightAnswers() {
    return this.allRightAnswers;
  }

  getData() {
    return this.dataAllGames;
  }

  async setData() {
    // TODO data from back
    // async addWordToDictionary(wordId: string) {
    // const body = { difficulty: 'easy' };
    // const url = `${this.baseUrl}/words/${wordId}`;
    // try {
    //   if (await this.isAdded(wordId)) {
    //     await this.http.put(url, body, { headers: this.httpHeaders }).toPromise();
    //   } else {
    //     await this.http.post(url, body, { headers: this.httpHeaders }).toPromise();
    //   }
    // } catch {
    //   this.toaster.showError('Слово не добавлено в словарь', 'Ошибка!');
    // }
    // }
  }
}
