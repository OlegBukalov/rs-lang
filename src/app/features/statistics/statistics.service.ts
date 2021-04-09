import { Injectable } from '@angular/core';

import { IItemListGames } from './interfaces/iitem-list-games';

import { GameID } from './enums/game-id.enum';

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

  getDataFromGame(idGame: GameID, countAll: number, countRight: number, maxRight: number): void {
    this.updateCountAnswers(idGame, countAll);
    this.updateCountRightAnswers(idGame, countRight);
    this.updateMaxRightAnswers(idGame, maxRight);
    this.updatePercentRightAnswers(idGame);
    this.updateAllRightAnswers();
  }

  updateCountAnswers(idGame: GameID, countAll: number): void {
    this.dataAllGames.find((item) => item.game === idGame).data.countAnswers += countAll;
  }

  updateCountRightAnswers(idGame: GameID, countRight: number): void {
    this.dataAllGames.find((item) => item.game === idGame).data.countRightAnswers += countRight;
  }

  updateMaxRightAnswers(idGame: GameID, maxRight: number): void {
    const currentMax = this.dataAllGames.find((item) => item.game === idGame).data.maxRightAnswers;

    if (currentMax < maxRight) {
      this.dataAllGames.find((item) => item.game === idGame).data.maxRightAnswers = maxRight;
    }
  }

  updatePercentRightAnswers(idGame: GameID): void {
    if (this.dataAllGames.find((item) => item.game === idGame).data.countRightAnswers !== 0) {
      const all = this.dataAllGames.find((item) => item.game === idGame).data.countAnswers;
      const right = this.dataAllGames.find((item) => item.game === idGame).data.countRightAnswers;

      this.dataAllGames.find((item) => item.game === idGame).data.percentRightAnswers =
        (right / all) * 100;
    }
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
