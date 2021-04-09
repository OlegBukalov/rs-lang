import { Injectable } from '@angular/core';

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
      game: GameID.Sprint,
      data: {
        name: 'Своя игра',
        countAnswers: 0,
        countRightAnswers: 0,
        percentRightAnswers: 0,
        maxRightAnswers: 0,
      },
    },
  ];

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

  updatePercentRightAnswers(item: IDataGame): void {
    if (item.countRightAnswers !== 0) {
      const all = item.countAnswers;
      const right = item.countRightAnswers;
      return (right / all) * 100;
    }
    return 0;
  }

  updateAllRightAnswers(): number {
    let all = 0;
    let right = 0;
    this.dataAllGames.map((item) => {
      all += item.data.countAnswers;
      right += item.data.countRightAnswers;
      return item;
    });
    this.allRightAnswers = (right / all) * 100;
    return this.allRightAnswers;
  }

  getAllRightAnswers() {
    return this.allRightAnswers;
  }

  getData() {
    return this.dataAllGames;
  }

  setData() {
    // TODO data from back
  }
}
