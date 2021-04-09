import { Injectable } from '@angular/core';

import { IDataGame } from './interfaces/idata-game';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  // TODO временно явно прописан со значениями, будет заменено на полученные данные с бэка
  private dataGame: IDataGame[] = [
    {
      id: 0,
      name: 'Саванна',
      countAnswers: 0,
      countRightAnswers: 0,
      maxRightAnswers: 0,
    },
    {
      id: 1,
      name: 'Аудиовызов',
      countAnswers: 0,
      countRightAnswers: 0,
      maxRightAnswers: 0,
    },
    {
      id: 2,
      name: 'Спринт',
      countAnswers: 0,
      countRightAnswers: 0,
      maxRightAnswers: 0,
    },
    {
      id: 3,
      name: 'Своя игра',
      countAnswers: 0,
      countRightAnswers: 0,
      maxRightAnswers: 0,
    },
  ];

  getDataFromGame(idGame: number, countAll: number, countRight: number, maxRight: number): void {
    this.updateCountAnswers(idGame, countAll);
    this.updateCountRightAnswers(idGame, countRight);
    this.updateMaxRightAnswers(idGame, maxRight);
  }

  updateCountAnswers(idGame: number, countAll: number): void {
    this.dataGame.find((item) => item.id === idGame).countAnswers += countAll;
  }

  updateCountRightAnswers(idGame: number, countRight: number): void {
    this.dataGame.find((item) => item.id === idGame).countRightAnswers += countRight;
  }

  updateMaxRightAnswers(idGame: number, maxRight: number): void {
    const currentMax = this.dataGame.find((item) => item.id === idGame).maxRightAnswers;
    if (currentMax < maxRight) {
      this.dataGame.find((item) => item.id === idGame).maxRightAnswers += maxRight;
    }
  }

  getData() {
    return this.dataGame;
  }

  setData() {
    // TODO data from back
  }
}
