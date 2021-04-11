import { Component } from '@angular/core';
import { IGameResult } from './interfaces';

enum GameStatus {
  Start = 'start',
  Game = 'game',
  End = 'end',
}

@Component({
  selector: 'app-audio-call',
  templateUrl: './audio-call.component.html',
  styleUrls: ['./audio-call.component.scss'],
})
export class AudioCallComponent {
  gameStatus: string;

  level = 1;

  score: IGameResult;

  constructor() {
    this.gameStatus = GameStatus.Start;
  }

  onGameStart(level: number): void {
    this.level = level;
    this.gameStatus = GameStatus.Game;
  }

  onGameEnd(score: IGameResult) {
    this.score = score;
    this.gameStatus = GameStatus.End;
  }

  onGameRepeat() {
    this.score.wordCounter = 0;
    this.score.correctWordCounter = 0;
    this.score.maxCorrectSequence = 0;
    this.level = 1;

    this.gameStatus = GameStatus.Start;
  }
}
