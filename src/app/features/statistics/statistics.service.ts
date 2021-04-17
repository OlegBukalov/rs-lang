import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

import { IItemListGames } from './interfaces/iitem-list-games';
import { IDataGame } from './interfaces/idata-game';
import { IDataUserGames } from './interfaces/idata-user-games';
import { IDataServerStatistics } from './interfaces/idata-server-statistics';
import { GameID } from './enums/game-id.enum';

import { START_DATA_GAMES } from './constants/startDataGames';

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
  private ratioAllRightAnswers = 0;
  private dataAllGames: IItemListGames[] = START_DATA_GAMES;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toaster: ToasterService,
  ) {}

  setDataFromGame(dataGame: ItemGame): void {
    const item = this.dataAllGames.find((itemGame) => itemGame.game === dataGame.idGame).data;
    item.countAnswers += dataGame.countAll;
    item.countRightAnswers += dataGame.countRight;
    item.maxRightAnswers = this.getMaxRightAnswers(item, dataGame.maxRight);
    item.percentRightAnswers = this.getPercentRightAnswers(item);
    this.setRatioAllRightAnswers();

    const currentDataGames: IDataUserGames = {
      currentDay: new Date().toString(),
      dataGames: {
        dataGameItems: this.dataAllGames,
        percentAllRightAnswers: this.ratioAllRightAnswers,
      },
    };
    this.setData(currentDataGames);
  }

  getMaxRightAnswers(item: IDataGame, maxRight: number): number {
    const currentMax = item.maxRightAnswers;
    if (currentMax < maxRight) {
      return maxRight;
    }
    return item.maxRightAnswers;
  }

  getPercentRightAnswers(item: IDataGame): number {
    if (item.countRightAnswers !== 0) {
      const all = item.countAnswers;
      const right = item.countRightAnswers;
      return right / all;
    }
    return 0;
  }

  setRatioAllRightAnswers(): void {
    let all = 0;
    let right = 0;
    this.dataAllGames.forEach((item) => {
      all += item.data.countAnswers;
      right += item.data.countRightAnswers;
      return item;
    });
    this.ratioAllRightAnswers = right / all;
  }

  private get baseUrl() {
    return `${environment.baseUrl}/users/${this.authService?.userId}`;
  }

  async setData(dataUser: IDataUserGames) {
    const url = `${this.baseUrl}/statistics`;
    const body = { learnedWords: 1, optional: dataUser };
    try {
      await this.http.put(url, body).toPromise();
    } catch {
      this.toaster.showInfo('Ошибка передачи данных', 'Уведомление');
    }
  }

  getUserStatistics(data: IDataUserGames): IDataUserGames {
    this.dataAllGames = data.dataGames.dataGameItems;
    return data;
  }

  getDataFromServer(): Observable<IDataServerStatistics> {
    const url = `${this.baseUrl}/statistics`;
    return this.http.get<IDataServerStatistics>(url);
  }
}
