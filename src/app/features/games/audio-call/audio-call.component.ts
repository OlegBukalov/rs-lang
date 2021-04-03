import { Component } from '@angular/core';

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

  constructor() {
    this.gameStatus = GameStatus.Start;
  }

  gameStart(level: number): void {
    this.level = level;
    this.gameStatus = GameStatus.Game;
  }
}
